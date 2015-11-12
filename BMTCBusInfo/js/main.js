
function createinfo()
{
	var topdiv = document.getElementById("main");
	var par = document.createElement('p');
	topdiv.appendChild(par);
	par.style.color = "#B40431";
	par.innerHTML =  "No Search Result Found. <br /> Please check whether you have selected the Bus-Stop from the dropdown list ";
}


function loadXMLDoc(from, to, how) {
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else {
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var obj = JSON.parse(xmlhttp.responseText);
			CreateBasicContent(from, to, how);
			
			$('#main')
			.append($('<div>')
			    .attr({ 'data-role': 'collapsible-set', 'id': 'mainRoute', 'border-width': '0px', 'data-content-theme': 'b',  'data-theme':'b',  'padding-left':'0%' }))
			 
			if (obj.route1)
				createdynamicContent(obj.route1.length, obj, "1", obj.route1);
			else
				createinfo();
			
			if (obj.route2)
				createdynamicContent(obj.route2.length, obj, "2", obj.route2);
			
			if (obj.route3)
				createdynamicContent(obj.route3.length, obj, "3", obj.route3);
			
			if (obj.route4)
				createdynamicContent(obj.route4.length, obj, "4", obj.route4);
			
			if (obj.route5)
				createdynamicContent(obj.route5.length, obj, "5", obj.route5);
			
			if (obj.route6)
				createdynamicContent(obj.route6.length, obj, "6", obj.route6);
			
			if (obj.route7)
				createdynamicContent(obj.route7.length, obj, "7", obj.route7);
			
			if (obj.route8)
				createdynamicContent(obj.route8.length, obj, "8", obj.route8);	
			
			HideLoadingSymbol();
			$('#mainRoute').collapsibleset().trigger('create');
	    }
	}
	var string = "http://bbus.in/api/v1/search/?from=" +from+"&to="+to+"&how="+how;

	xmlhttp.open("GET", string,true);
	xmlhttp.send();	
}

function HideLoadingSymbol()
{
	document.getElementById('main').style.visibility = 'visible';
	document.getElementById('loading').style.visibility = 'hidden';
}

function CreateBasicContent(from, to, how)
{
	var topdiv = document.getElementById("main");
	var par = document.createElement('p');
	topdiv.appendChild(par);
	var str1 = '<strong>'+ from+ '</strong><br />';
	var str2 = '<strong>'+ to+ '</strong><br />';
	var str3 = '<strong>'+ how+ '</strong><br />';
	par.innerHTML = "You queried <br>  FROM:  "+ str1 + "TO:  "+str2+"HOW:  "
			+str3+ "";
}
function createdynamicContent(leng, obj, val, routeobj) 
{
	var topdiv = document.getElementById("main");
	var entrytitle = "Route Plan " + val+ "#";
	
	if(routeobj[1])
	{	$('#mainRoute')
			.append($('<div>')
					.attr({ 'data-role': 'collapsible', 'id': 'route'+val, 'data-content-theme': 'b', 'data-expanded-icon':'arrow-d',
						'data-iconpos':'right', 'word-wrap': 'break-word','display': 'inline-block',
						'data-collapsed': 'true', 'border-width': '0px' , 'data-theme':'b', 'data-collapsed-icon':'arrow-r'})
		    .html('<h3>' + routeobj[0].From +'<br>->' + routeobj[0].To + '<br>->' + routeobj[1].To +'</h3>'))
	}
	else
	{
		$('#mainRoute')
		.append($('<div>')
				.attr({ 'data-role': 'collapsible', 'id': 'route'+val, 'data-content-theme': 'b', 'data-expanded-icon':'arrow-d',
					'data-iconpos':'right','word-wrap': 'break-word', 'display': 'inline-block',
					'data-collapsed': 'false', 'border-width': '0px' , 'data-theme':'b', 'data-collapsed-icon':'arrow-r'})
	    .html('<h3>' + routeobj[0].From +'<br>->' + routeobj[0].To + '</h3>'))
	}

	var i;
	
	for (i = 1; i <= leng; i++)
	{
		if(leng > 1)
		{	
			$('#route'+val)
			.append($('<div>')
				.attr({ 'data-role': 'collapsible', 'id': 'hop'+(i-1)+val, 'data-content-theme': 'b', 'data-mini':'true', 
					'data-expanded-icon':'arrow-d', 'data-iconpos':'right','word-wrap': 'break-word','display': 'inline-block',
		           'data-collapsed': 'true', 'border-width': '0px', 'data-theme':'b', 'data-collapsed-icon':'arrow-r'})
		        .html('<h3> '+ routeobj[i-1].From +'<br>->' + routeobj[i-1].To +'</h3>'))
			var newdiv = document.getElementById('hop'+(i-1)+val);
		}
		else
			var newdiv = document.getElementById('route'+val);
		
		var table = document.createElement('table');
		
		newdiv.appendChild(table);
		table.border='1';
		table.setAttribute('class', 'CSSTableGenerator', 'position:absolute');
	    
		var tr1 = document.createElement('TR');
		table.appendChild(tr1);
	    
	    var td1 = document.createElement('TD');
        td1.width='75';
        tr1.appendChild(td1);
        td1.innerHTML = "BusNo:";
        td1.setAttribute("style", "font-weight:bold");
        td1.style.backgroundColor = "#B8B8B8";
        td1.style.borderTopLeftRadius = "8px";
        
        
        var td2 = document.createElement('TD');
        tr1.appendChild(td2);
        td2.innerHTML = routeobj[i-1].bus_nos;
        td2.style.borderTopRightRadius = "8px";
        
        var tr2 = document.createElement('TR');
        table.appendChild(tr2);
	    
        var td3 = document.createElement('TD');
        td3.width='75';
        tr2.appendChild(td3);
        td3.innerHTML = "From:";
        td3.setAttribute("style", "font-weight:bold");
        td3.style.backgroundColor = "#B8B8B8";
        
        var td4 = document.createElement('TD');
        tr2.appendChild(td4);
        td4.innerHTML = routeobj[i-1].From;
        
        var tr3= document.createElement('TR');
        table.appendChild(tr3);
	    
        var td5 = document.createElement('TD');
        td5.width='75';
        tr3.appendChild(td5);
        td5.innerHTML = "To: ";
        td5.setAttribute("style", "font-weight:bold");
        td5.style.backgroundColor = "#B8B8B8";
        
        var td6 = document.createElement('TD');
        tr3.appendChild(td6);
        td6.innerHTML = routeobj[i-1].To;
        
        var tr4 = document.createElement('TR');
        table.appendChild(tr4);
	    
        var td7 = document.createElement('TD');
        td7.width='75';
        tr4.appendChild(td7);
        td7.innerHTML = "Distance:";
        td7.setAttribute("style", "font-weight:bold");
        td7.style.backgroundColor = "#B8B8B8";
        
        var td8 = document.createElement('TD');
        tr4.appendChild(td8);
        td8.innerHTML = routeobj[i-1].distance;
        
        var tr5 = document.createElement('TR');
        table.appendChild(tr5);
	    
        var td9 = document.createElement('TD');
        td9.width='75';
        tr5.appendChild(td9);
        td9.innerHTML = "Duration:";
        td9.setAttribute("style", "font-weight:bold");
        td9.style.backgroundColor = "#B8B8B8";
        
        var td10 = document.createElement('TD');
        tr5.appendChild(td10);
        td10.innerHTML = routeobj[i-1].duration;
        			
	}
	$('#route'+val).collapsibleset().trigger('create');	
}

var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");
    
    var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                	$('#main').empty();
                	$('#loading').empty();
                    $.mobile.urlHistory.activeIndex -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );
