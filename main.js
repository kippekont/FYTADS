console.log("Fuck YT ads");
let URL = window.location.href;
let counter = 0;
let URLChangeInterval = setInterval(onURLChanged, 100);
let adBlockErrorLoadedInterval = null;

if(window.location.hostname == "www.youtube.com" && window.location.pathname == "/watch")
{
	adBlockErrorLoadedInterval = setInterval(onAdBlockErrorLoaded, 1000);
}

function showEmbeddedVideo()
{
	disableCache();
	const newDiv = document.createElement("div");
	newDiv.style.zIndex = 100;
	newDiv.style.position = "fixed";

	newDiv.style.backgroundColor = "#000"
	const iframe = document.createElement("iframe");
	let UrlParameters = new URLSearchParams(window.location.search);
	iframe.setAttribute("src", "https://www.youtube.com/embed/" + UrlParameters.get('v'));
	iframe.style.width = "1250px";
	iframe.style.height = "750px";
	iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"); 
	iframe.setAttribute("allowfullscreen", "");

	newDiv.appendChild(iframe);
	videoContainer = document.getElementById("container");
	let video = document.body.querySelector( 'video' );
	if(video != null)
	{
		video.pause();
		video.currentTime = 0;
	}
	//document.body.innerHTML += newDiv.outerHTML;
	var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1250,height=750,top=,left=");
	win.document.body.innerHTML = newDiv.outerHTML;
}

function onURLChanged()
{
	if(URL != window.location)
	{
		URL = window.location.href;
		if(window.location.hostname == "www.youtube.com" && window.location.pathname == "/watch")
		{
			let divs = document.getElementsByTagName("ytd-enforcement-message-view-model");
			adBlockErrorLoadedInterval = setInterval(onAdBlockErrorLoaded, 1000);
		}
		else if(window.location.hostname == "www.youtube.com" && !window.location.pathname.includes("/shorts")){
			window.location.reload();
		}
	}
}

function onAdBlockErrorLoaded()
{
	let divs = document.getElementsByTagName("ytd-enforcement-message-view-model");
	console.log(adBlockErrorLoadedInterval);
	if(divs.length != 0)
	{
		console.log("test");
		clearInterval(adBlockErrorLoadedInterval);
		showEmbeddedVideo();
	}
}

function disableCache()
{
	var meta = document.createElement('meta');
	meta.httpEquiv = "Pragma";
	meta.content = "no-cache";
	document.getElementsByTagName('head')[0].appendChild(meta);
	var meta = document.createElement('meta');
	meta.httpEquiv = "Expires";
	meta.content = "-1";
	document.getElementsByTagName('head')[0].appendChild(meta);
	var meta = document.createElement('meta');
	meta.httpEquiv = "CACHE-CONTROL";
	meta.content = "NO-CACHE";
	document.getElementsByTagName('head')[0].appendChild(meta);
}
