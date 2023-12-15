//ACTIVATE DRAGGING FUNCTIONALITY
function activateDrag(){
    var elements = document.getElementsByClassName('repositionable');
    for (var i = 0; i < elements.length; i++) {
        dragElement(elements[i]);
    }
}
// ADD CARDS TO LIST
function addNewCards(){
    // Get the input value and split it into an array of words
    var wordsInput = document.getElementById('wordInput').value;
    var cardArray = wordsInput.split(',');
    cardcode='';
    cardArray.forEach(element => {
         cardcode+='<div class="repositionable card"><p>'+element+'</p></div>';
    });
    document.getElementById("cardwrapper").innerHTML=cardcode;
    activateDrag();
}


function dragElement(elmnt) {
  var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	
	addTouchToMouse(elmnt);
	elmnt.onmousedown = dragMouseDown;  
	

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }


// Touch support added by Jonathan Arnett: https://codepen.io/sophtwhere

	function addTouchToMouse(forEl) {
		doc = document;

		if (typeof forEl.removeTouchToMouse === "function") return;

		doc.addEventListener("touchstart", touch2Mouse, true);
		doc.addEventListener("touchmove", touch2Mouse, true);
		doc.addEventListener("touchend", touch2Mouse, true);
		var touching = false;
		
		 function isValidTouch (el) {
					if (el===forEl) return true;

					if ((el.parentElement===forEl)&&["INPUT","A","BUTTON"].indexOf(el.tagName)<0) return true;
				}
		function touch2Mouse(e) {
			var theTouch = e.changedTouches[0];
			var mouseEv;

			if (!isValidTouch(e.target)) return;

			switch (e.type) {
				case "touchstart":
					if (e.touches.length !== 1) return;
					touching = true;
					mouseEv = "mousedown";
					break;
				case "touchend":
					if (!touching) return;
					mouseEv = "mouseup";
					touching = false;
					break;
				case "touchmove":
					if (e.touches.length !== 1) return;
					mouseEv = "mousemove";
					break;
				default:
					return;
			} 

			var mouseEvent = document.createEvent("MouseEvent");
			mouseEvent.initMouseEvent(
				mouseEv,
				true,
				true,
				window,
				1,
				theTouch.screenX,
				theTouch.screenY,
				theTouch.clientX,
				theTouch.clientY,
				false,
				false,
				false,
				false,
				0,
				null
			);
			theTouch.target.dispatchEvent(mouseEvent);

			e.preventDefault();
		}

		forEl.removeTouchToMouse = function removeTouchToMouse() {
			doc.removeEventListener("touchstart", touch2Mouse, true);
			doc.removeEventListener("touchmove", touch2Mouse, true);
			doc.removeEventListener("touchend", touch2Mouse, true);
		};
	}
}
