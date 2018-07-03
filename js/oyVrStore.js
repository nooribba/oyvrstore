(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','js/analytics.js','ga');

	  ga('create', 'UA-92113119-1', 'auto');
	  ga('send', 'pageview');

(function () {
    // Custom states.
    var clickedEl = null;
    var els = document.querySelectorAll('a-entity');
    Array.prototype.forEach.call(els, function (el) {
      el.addEventListener('click', function () {
        if (clickedEl && clickedEl !== el) {
          clickedEl.removeState('selected');
        }
        if (!el.classList.contains('clickable')) { return; }
        clickedEl = el;
        clickedEl.addState('selected');
      });
    });

    // Responding to mouse events.
    var cubes = document.querySelectorAll('a-entity[mixin*=cube]');
    var i;
    for (i = 0; i < cubes.length; ++i) {
      cubes[i].addEventListener('click', function () {
        var href = this.getAttribute('href');
        if (!href) { return; }
        window.top.postMessage({type: 'navigate', data: {url: href}}, '*');
      })
    }

    
  })();

function hideIt(layer) {
	if (dom) {document.getElementById(layer).style.visibility='hidden';}
	if (document.layers) {document.layers[layer].visibility='hide';} }
function showIt(layer, setHTML) {
	var toxicHTML = "";
	if (dom) {
		/*console.log('dom');*/
		$("#toxicListUl").html(setHTML);
		document.getElementById(layer).style.visibility='visible';
	}
	if (document.layers) {
		/*console.log('layers');*/
		$("#toxicListUl").html(setHTML);
		document.layers[layer].visibility='show';
	} 
}

function popupwindow(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	//window.confirm("something!!");
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function goProduct(url) {
  console.log('goProduct');
  location.href='http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000012881&dispCatNo=1000001000100010004';
}


function searchToxic(chem) {
  //alert(chem);
  $.ajax({
      async: true,
      // url: "http://localhost:9090/appserver/ts",
      url: "http://52.2.165.121:24050/appserver/ts",
      type: "GET",
      timeout: 4000,
      data: {
          //chem_name_kor: $("#chem_name_kor").val()
          chem_name_kor:chem
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(JSONObject) {
          var toxicHTML = "";
          // var JSONString = JSON.stringify(result);
          // var JSONObject = $.parseJSON(JSONString);
          for (var key in JSONObject) {
              if (JSONObject.hasOwnProperty(key)) {
                  toxicHTML = "";
                  toxicHTML += "<h3>" + JSONObject[key]["chem_name_kor"] + "(" + JSONObject[key]["chem_name_eng"] + ")</h3>";
                  toxicHTML += "<pre>"
                  toxicHTML += "<li>  ●물질분류명:" + JSONObject[key]["category_name"] + "</li>";
                  toxicHTML += "<li>  ●독성코드:" + JSONObject[key]["toxic_code"] + "</li>";
                  toxicHTML += "<li>  ●피부독성:" + JSONObject[key]["derma_tox"] + "</li>";
                  toxicHTML += "<li>  ●독성효과:" + JSONObject[key]["tox_effect"] + "</li>";
                  toxicHTML += "</pre>"
              }
          }
          if(toxicHTML == ""){
              toxicHTML += "<h3>"+chem+" 에 대한 독성정보가 검색되지 않았습니다.</h3>";
          }
          $("#toxicListUl").html(toxicHTML);
          /*$("[data-role=listview]").listview("refresh");*/
          
          if (dom) {document.getElementById('view_chem').style.visibility='visible';}
          if (document.layers) {document.layers['view_chem'].visibility='show';} 
      },
      error: function() {
          alert("[FAIL] Check your system. ");
      },
      complete: function() {
          // AJAX 호출이 종료되면 무조건 호출(finally)
      }
  });
}

function searchToxic(chem) {
  //alert(chem);
  $.ajax({
      async: true,
      // url: "http://localhost:9090/appserver/ts",
      url: "http://52.2.165.121:24050/appserver/ts",
      type: "GET",
      timeout: 4000,
      data: {
          //chem_name_kor: $("#chem_name_kor").val()
          chem_name_kor:chem
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(JSONObject) {
          var toxicHTML = "";
          // var JSONString = JSON.stringify(result);
          // var JSONObject = $.parseJSON(JSONString);
          for (var key in JSONObject) {
              if (JSONObject.hasOwnProperty(key)) {
                  toxicHTML = "";
                  toxicHTML += "<h3>" + JSONObject[key]["chem_name_kor"] + "(" + JSONObject[key]["chem_name_eng"] + ")</h3>";
                  toxicHTML += "<pre>"
                  toxicHTML += "<li>  ●물질분류명:" + JSONObject[key]["category_name"] + "</li>";
                  toxicHTML += "<li>  ●독성코드:" + JSONObject[key]["toxic_code"] + "</li>";
                  toxicHTML += "<li>  ●피부독성:" + JSONObject[key]["derma_tox"] + "</li>";
                  toxicHTML += "<li>  ●독성효과:" + JSONObject[key]["tox_effect"] + "</li>";
                  toxicHTML += "</pre>"
              }
          }
          if(toxicHTML == ""){
              toxicHTML += "<h3>"+chem+" 에 대한 독성정보가 검색되지 않았습니다.</h3>";
          }
          $("#toxicListUl").html(toxicHTML);
          /*$("[data-role=listview]").listview("refresh");*/
          
          if (dom) {document.getElementById('view_chem').style.visibility='visible';}
          if (document.layers) {document.layers['view_chem'].visibility='show';} 
      },
      error: function() {
          alert("[FAIL] Check your system. ");
      },
      complete: function() {
          // AJAX 호출이 종료되면 무조건 호출(finally)
      }
  });
}

function getWishList(user_id, use_yn) {
  $.ajax({
      async: true,
      url: "http://52.2.165.121:24050/appserver/wl",
      type: "GET",
      timeout: 4000,
      data: {
          user_id:user_id,
          use_yn:use_yn
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(JSONObject) {
        var seq = 0;
    	  for (var key in JSONObject) {
              /*console.log(JSONObject[key]["user_id"]);
              console.log(JSONObject[key]["pd_id"]);
              console.log(JSONObject[key]["pd_name"]);
              console.log(JSONObject[key]["pd_cnt"]);
              console.log(JSONObject[key]["price"]);*/
              seq = parseInt(key)+1;
              $('#cartImg'+seq).attr('src','img/product_'+JSONObject[key]["pd_id"]+'.jpg');
              $('#cartDeleteBtn'+seq).attr('goodsNo', JSONObject[key]["pd_id"]);
              $('#cartContentsBox'+seq).attr('goodsNo',JSONObject[key]["pd_id"]);
              $('#goodsName'+seq).attr('value','NAME: '+ JSONObject[key]["pd_name"]);
              $('#goodsPrice'+seq).attr('value','PRICE: '+ JSONObject[key]["price"]);
              $('#goodsPrice'+seq).attr('price', JSONObject[key]["price"]);
              $('#orderCnt'+seq).attr('value', JSONObject[key]["pd_cnt"])
              $('#orderCnt'+seq).attr('cnt', JSONObject[key]["pd_cnt"])
              $('#cartContentsBox'+seq).attr('visible', 'true');
              $("#cartInfoBox"+seq).attr('visible','true');
          }
          $("#cartInfoBox").attr('product_list_cnt',seq);
          getTotalAmt();
      },
      error: function() {
          alert("[FAIL] Check your system. ");
      },
      complete: function() {
          
      }
  });
}

function addWishProductOne(product_list_cnt, gds_cd1, gds_qty1) {
  $.ajax({
      async: true,
      url: "http://52.2.165.121:24050/appserver/awp1",
      type: "GET",
      timeout: 10000,
      data: {
          product_list_cnt:product_list_cnt,
          gds_cd1:gds_cd1,
          gds_qty1:gds_qty1
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(result) {
          console.log('success addWishProduct');
          console.log(result);
      },
      error: function(jqxhr, textStatus, errorThrown) {
          alert("[FAIL] Check your system");
          console.log(textStatus, jqxhr.getAllResponseHeaders(), errorThrown);
      },
      complete: function() {
          
      }
  });
}
function addWishProductTwo(product_list_cnt, gds_cd1, gds_qty1, gds_cd2, gds_qty2) {
  $.ajax({
      async: true,
      url: "http://52.2.165.121:24050/appserver/awp2",
      type: "GET",
      timeout: 10000,
      data: {
          product_list_cnt:product_list_cnt,
          gds_cd1:gds_cd1,
          gds_qty1:gds_qty1,
          gds_cd2:gds_cd2,
          gds_qty2:gds_qty2
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(result) {
          console.log('success addWishProduct');
          console.log(result);
      },
      error: function(jqxhr, textStatus, errorThrown) {
          alert("[FAIL] Check your system");
          console.log(textStatus, jqxhr.getAllResponseHeaders(), errorThrown);
      },
      complete: function() {
          
      }
  });
}
function addWishProductThree(product_list_cnt, gds_cd1, gds_qty1, gds_cd2, gds_qty2, gds_cd3, gds_qty3) {
  $.ajax({
      async: true,
      url: "http://52.2.165.121:24050/appserver/awp3",
      type: "GET",
      timeout: 10000,
      data: {
          product_list_cnt:product_list_cnt,
          gds_cd1:gds_cd1,
          gds_qty1:gds_qty1,
          gds_cd2:gds_cd2,
          gds_qty2:gds_qty2,
          gds_cd3:gds_cd3,
          gds_qty3:gds_qty3
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(result) {
          console.log('success addWishProduct');
          console.log(result);
          /*for (var key in JSONObject) {
              if (JSONObject.hasOwnProperty(key)) {
                console.log(JSONObject[key]["result"]);
              }
          }*/
      },
      error: function(jqxhr, textStatus, errorThrown) {
          alert("[FAIL] Check your system");
          console.log(textStatus, jqxhr.getAllResponseHeaders(), errorThrown);
      },
      complete: function() {
          
      }
  });
}

function deleteWishList(user_id, pd_id , use_yn) {
  $.ajax({
      async: true,
      url: "http://52.2.165.121:24050/appserver/dwl",
      type: "GET",
      timeout: 4000,
      data: {
          user_id:user_id,
          pd_id:pd_id,
          use_yn:use_yn
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(result) {
          console.log('success deleteWishProduct');
          console.log(result);
          /*for (var key in result) {
              console.log(result[key]["result"]);
          }*/
      },
      error: function() {
          alert("[FAIL] Check your system...");
      },
      complete: function() {
          
      }
  });
}

function addWishList(user_id, pd_id , pd_cnt, use_yn) {
  $.ajax({
      async: true,
      url: "http://52.2.165.121:24050/appserver/awl",
      type: "GET",
      timeout: 4000,
      data: {
          user_id:user_id,
          pd_id:pd_id,
          pd_cnt:pd_cnt,
          use_yn:use_yn
      },
      dataType: "jsonp",
      jsonp: "callback",
      success: function(result) {
          console.log('success addWishList');
          console.log(result);
      },
      error: function() {
          alert("[FAIL] Check your system...");
      },
      complete: function() {
          
      }
  });
}

(function () {
    "use strict";
    var showSelectedText = function (e) {
        var text = '';
        if (window.getSelection) {
            text = window.getSelection();
        } else if (document.getSelection) {
            text = document.getSelection();
        } else if (document.selection) {
            text = document.selection.createRange().text;
        }

        if(text.toString()!="")
          console.log('text:'+text.toString());
    }

    document.onmouseup = showSelectedText;
    if (!document.all) {
        document.captureEvents(Event.MOUSEUP);
    }

})();


