$(document).ready(function () {
  $("#itinerary-confirm").on('click', function() {
    var itinerary = $("#airticket-itinerary").val();

    var startstring = itinerary.split('\n')[0];

    var res;
    if (itinerary.match(/RT\s\w{6}/g) ||
               itinerary.match(/RT\:\s\w{6}/g) ||
               itinerary.match(/\d\.[A-Z]+\/[A-Z]+\s[A-Z]*\s*[A-Za-z0-9]{6}/g)) {

     try {
       res = eterm(itinerary);
     } catch (error) {
       alert("Itinerary格式不正确，请重新输入。");
     }

    } else if (itinerary.match(/RECEIVED\sFROM\s\-\s[\w\/\-]*[\s\n]+[A-Za-z0-9]+\.[A-Za-z0-9\*]+\s\d{4}\/\d{2}\w{3}\d{2}\s[A-Za-z0-9]{6}/g) ||
        itinerary.split('\n')[0].match(/\**\s*[A-Za-z0-9]{6}\s*\?/g)) {

      try {
        res = sabre(itinerary);
      } catch (error) {
        alert("Itinerary格式不正确，请重新输入。");
      }

    } else if (itinerary.split('\n')[0].match(/P-\s/g)) {

      try {
        res = wordspan(itinerary);
      } catch (error) {
        alert("Itinerary格式不正确，请重新输入。");
      }

    } else if (itinerary.match(/RT[A-Za-z0-9]{6}/g) ||
               itinerary.match(/rt[A-Za-z0-9]{6}/g) ||
               itinerary.match(/\-{3}[\s]TST[\s]RLR[\s]SFP[\s]\-{3}/g) ||
               itinerary.match(/RP[\/A-Za-z0-9]*[\s\n]*[A-Za-z0-9\/]+[\s]+[A-Za-z0-9\/]+[\s]+[A-Za-z0-9]+/g) ||
               itinerary.split('\n')[0].match(/[A-Za-z0-9]{6}/g)) {
      try {
        res = amadeus(itinerary);
      } catch (error) {
        alert("Itinerary格式不正确，请重新输入。");
      }

    } else {
      alert("Itinerary格式不正确，请重新输入。");
    }

    console.log(res);

    if(res[0]['locator'] != null) {
      $("#air-ticket-create-locator").val(res[0]['locator']);
    }

    if (res[0]['invoice'] != null) {
      $("#air-ticket-create-invoice").val(res[0]['invoice']);
    }

    if (res[0]['fcode'] != null) {
      $("#air-ticket-create-air-company-code").val(res[0]['fcode']);
    }

    if (res[0]['name'] != null) {
      for (var i = 1; i < res[0]['name'].length; i++) {
        $("#passenger-list").append(`
            <span>
              <select class="passenger-info">
                <option value="adult">成人</option>
                <option value="youth">青年</option>
                <option value="children">儿童</option>
                <option value="infant">婴儿</option>
              </select>
              <input type="text" placeholder="姓/名" class="passenger-name">
              <input type="text" placeholder="票号" class='passenger-ticket-number'>
            </span>
          `);
      }
      $("#air-ticket-create-total-number").val(res[0]['name'].length);

      for (var i = 0; i < res[0]['name'].length; i++) {
        $(".passenger-name").eq(i).val(res[0]['name'][i]);
      }
    }

    if (res[0]['ticketNumber'] != null) {
      for (var i = 0; i < res[0]['name'].length; i++) {
        $(".passenger-ticket-number").eq(i).val(res[0]['ticketNumber'][i]);
      }
    }

    if (res[0]['type'] != null) {
      var adult = children = infant = youth = 0;
      for(var i = 0; i < res[0]['type'].length; i++) {
        var str = res[0]['type'][i];
        if(str == 'ADT' || str == 'JCB') {
          adult++;
          $(".passenger-info").eq(i).val('adult');
        } else if (str == 'CNN' || str == 'CHD') {
          children++;
          $(".passenger-info").eq(i).val('children');
        } else if (str == 'INF') {
          infant++;
          $(".passenger-info").eq(i).val('infant');
        } else if (str == 'YTH') {
          youth++;
          $(".passenger-info").eq(i).val('youth');
        }
      }
    }

    if (res[0]['trips'] != null) {
      var numTrips = res[0]['trips'].length;
      $("#air-ticket-schedule").empty();
      for(var i = 0; i < numTrips; i++) {
        $("#air-ticket-schedule").append(`
          <li class="requiredItem">
              <label class="nm-left">旅途</label>
              <div class="tour nm-left">
                  <input type="text" placeholder="航班号" class="flightNum"  value=""/>
                  <input type="date" placeholder="出发时间" class="startTime"/>
                  <input type="text" placeholder="机场" class="airport"/>
              </div>
          </li>
        `);
      }
      $("ul#air-ticket-schedule").find("li").first().append(
      	`
          <img src="../img/addIcon.png" class="addInfo">
      	  <img src="../img/deleteIcon.png" class="deleteInfo"/>
      	`
      );
      for(var i = 0; i < numTrips; i++) {
        $(".flightNum").eq(i).val(res[0]['trips'][i]['flightNUM']);
        $(".startTime").eq(i).val(res[0]['trips'][i]['time'].substring(0, 10));
        $(".airport").eq(i).val(res[0]['trips'][i]['leave'].concat('-').concat(res[0]['trips'][i]['arrive']));
      }
    }
  });

  var timedict = {
    "JAN": "01",
    "FEB": "02",
    "MAR": "03",
    "APR": "04",
    "MAY": "05",
    "JUN": "06",
    "JUL": "07",
    "AUG": "08",
    "SEP": "09",
    "OCT": "10",
    "NOV": "11",
    "DEC": "12"
  }

  function wordspan(itinerary) {
    var result = [];

    // 定位
    var locator = itinerary.substring(4, 10);

    // 乘客姓名和类型
    var namelist = itinerary.match(/\d\.\d[A-Za-z0-9\/]+\*\w{3}/g);
    var customerName = new Array();
    var customerType = new Array();
    for(var j = 0; j < namelist.length; j++) {
      var name = namelist[j].match(/\d\.\d[A-Za-z0-9\/]+/g);
      if(name.length > 0) {
        customerName.push(name[0].substring(3, name[0].length));
      }
      type = namelist[j].split("*");
      customerType.push(type[1]);
    }

    var ticketNumberList = itinerary.match(/1P\/[A-Za-z0-9]{3}\/[A-Za-z0-9]{2}\*E[0-9]+\s+[A-Z]+\/[A-Z]+\*[A-Z]{3}/g);
    var ticketNumber = new Array();
    if (ticketNumberList != null) {
        var len = ticketNumberList.length;
        for (var j = 0; j < namelist.length; j++) {
          ticketNumber.push(ticketNumberList[len - j - 1].match(/E[0-9]{2,}/g));
        }
    }


    // 航司编码
    var fcode = itinerary.match(/\*DR[\n\s][A-Za-z0-9\s]+[\n]/g);
    if(fcode) {
      fcode[0] = fcode[0].trim(" ");
      fcode = fcode[0].substr(-6, );
    } else {
      fcode = "";
    }

    // invoice
    var invoice = itinerary.match(/INV\s\w{6}-\d{6}/g);
    if(invoice) {
      var invoicestr = invoice[0].split(' ')[1];
    } else {
      var invoicestr = "";
    }

    // 行程
    var trips = itinerary.match(/\d[\s\*]+\w{2}\s*\d*\w{1}\s\d{2}\w{3}\s\w{2}\s*\w{6}\s\w{3}\s*\d+[P,A,N]/g);
    var tripslist = [];
    for(var t = 0; t < trips.length; t++) {
      var retripe = /[\s\*]/g;
      var trips1 = trips[t].split(retripe);

      trips1 = trips1.filter(function(n) {
        return n
      });

      if(trips1.length == 8) {
        var flightNUM = trips1[1] + trips1[2];  // 航班号
        var leave = trips1[5].substring(0, 3);  // 出发机场
        var arrive = trips1[5].substring(3, 6); // 到达机场
        var time = trips1[3];                   // 出发时间

        var myDate = new Date();
        if(myDate.getMonth() < 9) {
          var monthstr = "0" + (myDate.getMonth() + 1);
        } else {
          var monthstr = myDate.getMonth() + 1;
        }
        if(myDate.getDate() < 10) {
          var daystr = "0" + myDate.getDate();
        } else {
          var daystr = myDate.getDate();
        }

        var timenow = monthstr + daystr;
        var timestr = timedict[time.substr(2, 5)] + time.substring(0, 2);
        if(timenow < timestr) {
          var timest = myDate.getFullYear() + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4) + " " + trips1[7].substring(0, -3) + ":" + trips1[7].substring(-2);
        } else {
          var timest = (myDate.getFullYear() + 1) + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4) + " " + trips1[7].substring(0, -3) + ":" + trips1[7].substring(-2);
        }

        tripslist.push({
          "flightNUM": flightNUM,
          "leave": leave,
          "arrive": arrive,
          "time": timest
        });
      } else {
        var flightNUM = trips1[1];
        var leave = trips1[4].substring(0, 3);
        var arrive = trips1[4].substring(3, 6);
        var time = trips1[2];

        var myDate = new Date();
        if(myDate.getMonth() < 9) {
          var monthstr = "0" + (myDate.getMonth() + 1);
        } else {
          var monthstr = myDate.getMonth() + 1;
        }
        if(myDate.getDate() < 10) {
          var daystr = "0" + myDate.getDate();
        } else {
          var daystr = myDate.getDate();
        }

        var timenow = monthstr + daystr;
        var timestr = timedict[time.substr(2, 5)] + time.substring(0, 2);
        if(timenow < timestr) {
          var timest = myDate.getFullYear() + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4) + " " + trips1[6].substring(0, -3) + ":" + trips1[6].substring(-2);
        } else {
          var timest = (myDate.getFullYear() + 1) + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4) + " " + trips1[6].substring(0, -3) + ":" + trips1[6].substring(-2);
        }

        tripslist.push({
          "flightNUM": flightNUM,
          "leave": leave,
          "arrive": arrive,
          "time": timest
        });
      }
    };

    result.push({
      "name": customerName,
      "type": customerType,
      "ticketNumber": ticketNumber,
      "invoice": invoicestr,
      "fcode": fcode,
      "locator": locator,
      "trips": tripslist
    });
    return result;
  }

  function amadeus(itinerary) {
    var result = [];

    // 乘客信息
    var name = itinerary.match(/\d\.[A-Z\/]+\(*[A-Z]*\)*/g);
    var customerName = new Array();
    var customerType = new Array();
    for(var j = 0; j < name.length; j++) {
      var curName = name[j].match(/\d\.[A-Z\/]*/g)[0].substring(2);
      customerName.push(curName);
      var curType = name[j].match(/\([A-Z]{3}\)/g);
      if (curType) {
        customerType.push(curType[0].substring(1, 4));
      } else {
        customerType.push('ADT')
      }
    }

    // locator
    var locatorpattern = itinerary.match(/\w{6}\s*1\.[A-Z]/g);
    var retripe = /[\s\n]/g;
    var locatorlist = locatorpattern[0].split(retripe);
    var locator = locatorlist[0];

    // invoice
    var invoice = itinerary.match(/RM\sINV\s\w{6}-\d{6}/g);
    if(invoice) {
      var invoicestr = invoice[0].split(' ')[2];
    } else {
      var invoicestr = "";
    }

    // 行程
    var trips = itinerary.match(/\d\s*\w{2}\s*\d*\s[A-Z]\s\d{2}\w{3}\s\d\s\w{6}/g);
    var tripslist = [];
    for(var t = 0; t < trips.length; t++) {
      var retripe = /[\s]/g;
      var trips1 = trips[t].split(retripe);

      trips1 = trips1.filter(function(n) {
        return n
      });

      if(trips1.length == 7) {
        var flightNUM = trips1[1] + trips1[2];
        var leave = trips1[6].substring(0, 3);
        var arrive = trips1[6].substring(3, 6);
        var time = trips1[4];
        var myDate = new Date();

        if(myDate.getMonth() < 9) {
          var monthstr = "0" + (myDate.getMonth() + 1);
        } else {
          var monthstr = myDate.getMonth() + 1;
        }

        if(myDate.getDate() < 10) {
          var daystr = "0" + myDate.getDate();
        } else {
          var daystr = myDate.getDate();
        }

        var timenow = monthstr + daystr;
        var timestr = timedict[time.substr(2, 5)] + time.substring(0, 2);
        if(timenow < timestr) {
          var timest = myDate.getFullYear() + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        } else {
          var timest = (myDate.getFullYear() + 1) + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        }

        tripslist.push({
          "flightNUM": flightNUM,
          "leave": leave,
          "arrive": arrive,
          "time": timest
        });
      } else {
        var flightNUM = trips1[1];
        var leave = trips1[5].substring(0, 3);
        var arrive = trips1[5].substring(3, 6);
        var time = trips1[3];
        var myDate = new Date();

        if(myDate.getMonth() < 9) {
          var monthstr = "0" + (myDate.getMonth() + 1);
        } else {
          var monthstr = myDate.getMonth() + 1;
        }

        if(myDate.getDate() < 10) {
          var daystr = "0" + myDate.getDate();
        } else {
          var daystr = myDate.getDate();
        }

        var timenow = monthstr + daystr;
        var timestr = timedict[time.substr(2, 5)] + time.substring(0, 2);
        if(timenow < timestr) {
          var timest = myDate.getFullYear() + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        } else {
          var timest = (myDate.getFullYear() + 1) + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        }

        tripslist.push({
          "flightNUM": flightNUM,
          "leave": leave,
          "arrive": arrive,
          "time": timest
        });
      }
    }

    result.push({
      "name": customerName,
      "invoice": invoicestr,
      "locator": locator,
      "trips": tripslist,
      "type": customerType
    });

    return result;
  }

  function eterm(itinerary) {
    var result = [];

    var locator = itinerary.match(/\d\.\d*[A-Z]+\/[A-Z]+\s[A-Z]*\s*[A-Za-z0-9]{6}/g);
    locator = locator[0].substr(-6);

    var nameList = itinerary.match(/\d\.\d*[A-Z]+\/[A-Z][A-Z]+/g);
    var customerName = new Array();
    var customerType = new Array();
    for (var i = 0; i < nameList.length; i++) {
      customerName.push(nameList[i].substr(2));
      customerType.push('ADT');
    }

    var trips = itinerary.match(/\d.\s{2}\w{2}\d+\s+\w\d*\s+\w{2}\d{2}\w{3}\s+\w{6}/g);
    var tripslist = [];

    for(var t = 0; t < trips.length; t++) {
      var trips1 = trips[t].split(' ');
      trips1 = trips1.filter(function(n) {
        return n
      });

      var flightNUM = trips1[1];
      var leave = trips1[4].substring(0, 3);
      var arrive = trips1[4].substring(3, 6);

      var time = trips1[3];
      var myDate = new Date();
      if(myDate.getMonth() < 9) {
        var monthstr = "0" + (myDate.getMonth() + 1);
      } else {
        var monthstr = myDate.getMonth() + 1;
      }
      if(myDate.getDate() < 10) {
        var daystr = "0" + myDate.getDate();
      } else {
        var daystr = myDate.getDate();
      }

      var timenow = monthstr + daystr;
      var timestr = timedict[time.substr(4, 7)] + time.substring(2, 4);

      if(timenow < timestr) {
        var timest = myDate.getFullYear() + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
      } else {
        var timest = (myDate.getFullYear() + 1) + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
      }
      tripslist.push({
        "flightNUM": flightNUM,
        "leave": leave,
        "arrive": arrive,
        "time": timest
      });
    };

    result.push({
      "name": customerName,
      "type": customerType,
      "locator": locator,
      "trips": tripslist
    });

    return result;
  }

  function sabre(itinerary) {
    var result = [];

    // locator
    var locator = "";
    var locatorRegex = itinerary.match(/RECEIVED\sFROM\s\-\s[\w\/\-]*[\s\n]+[A-Za-z0-9]+\.[A-Za-z0-9\*]+\s\d{4}\/\d{2}\w{3}\d{2}\s[A-Za-z0-9]{6}/g);
    if (locatorRegex) {
      locator = locatorRegex[0].substr(locatorRegex.length - 7);
    } else {
      locator = itinerary.split('\n')[0].match(/[A-Za-z0-9]{6}/g)[0];
    }

    // 乘客信息
    var namelist = itinerary.match(/\d\.1([A-Z]+\/[A-Z]+)/g);
    var customerName = new Array();
    var customerType = new Array();
    for(var j = 0; j < namelist.length; j++) {
      customerName.push(namelist[j].substring(3, namelist[j].length));
      customerType.push('ADT');
    }

    // invoice
    var invoice = itinerary.match(/INVOICE\sNBR\s(\d*)/ig);
    if(invoice) {
      var invoicestr = invoice[0].split(' ')[2];
    } else {
      var invoicestr = "";
    }

    // 行程信息
    var tripsf = itinerary.match(/\/[A-Za-z0-9]+\*[\w]{6}/g);
    var flightCode = tripsf[0].split('\*');
    var fcode = flightCode[1]

    var trips = itinerary.match(/\d\s\w{2}\s*\d*\w{1}\s\d{2}\w{3}\s[A-Za-z0-9]\s\w{6}/g);
    var tripslist = [];
    for(var t = 0; t < trips.length; t++) {
      var trips1 = trips[t].split(' ');
      trips1 = trips1.filter(function(n) {
        return n
      });

      if (trips1.length == 6) {
        var flightNUM = trips1[1] + trips1[2];
        var leave = trips1[5].substring(0, 3);
        var arrive = trips1[5].substring(3, 6);

        var time = trips1[3];
        var myDate = new Date();
        if(myDate.getMonth() < 9) {
          var monthstr = "0" + (myDate.getMonth() + 1);
        } else {
          var monthstr = myDate.getMonth() + 1;
        }
        if(myDate.getDate() < 10) {
          var daystr = "0" + myDate.getDate();
        } else {
          var daystr = myDate.getDate();
        }

        var timenow = monthstr + daystr;
        var timestr = timedict[time.substr(2, 5)] + time.substring(0, 2);
        if(timenow < timestr) {
          var timest = myDate.getFullYear() + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        } else {
          var timest = (myDate.getFullYear() + 1) + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        }
        tripslist.push({
          "flightNUM": flightNUM,
          "leave": leave,
          "arrive": arrive,
          "time": timest
        });
      } else if (trips1.length == 5) {
        var flightNUM = trips1[1];
        var leave = trips1[4].substring(0, 3);
        var arrive = trips1[4].substring(3, 6);

        var time = trips1[2];
        var myDate = new Date();
        if(myDate.getMonth() < 9) {
          var monthstr = "0" + (myDate.getMonth() + 1);
        } else {
          var monthstr = myDate.getMonth() + 1;
        }
        if(myDate.getDate() < 10) {
          var daystr = "0" + myDate.getDate();
        } else {
          var daystr = myDate.getDate();
        }

        var timenow = monthstr + daystr;
        var timestr = timedict[time.substr(2, 5)] + time.substring(0, 2);
        if(timenow < timestr) {
          var timest = myDate.getFullYear() + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        } else {
          var timest = (myDate.getFullYear() + 1) + "-" + timestr.substring(0, 2) + "-" + timestr.substring(2, 4);
        }
        tripslist.push({
          "flightNUM": flightNUM,
          "leave": leave,
          "arrive": arrive,
          "time": timest
        });
      }
    }

    var invoice = itinerary.match(/INVOICE\sNBR\s\d{7}/g);
    if(invoice) {
      invoice = invoice[0].split(" ");
      invoicestr = invoice[2];
    } else {
      invoicestr = "";
    }
    result.push({
      "name": customerName,
      "invoice": invoicestr,
      "fcode": fcode,
      "locator": locator,
      "trips": tripslist,
      "type": customerType
    });

    return result;
  }
});
