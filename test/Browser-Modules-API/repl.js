
window.on = function (target, event, listener) {
    return target.addEventListener(event, listener);
};

window.off = function (target, event) {
    return target.removeEventListener(event, null);
};

window.element = function (target, element, options) {
    options = (options || {});
    parent = document.createElement(element);
    if (options.class) {
        parent.className = options.class;
    }
    if (options.text) {
        child = document.createTextNode(options.text);
        parent.appendChild(child);
    } else if (options.html) {
        parent.innerHTML = options.html;
    }
    return target.appendChild(parent);
};



// proxy console.log


// proxy console.warn


// proxy console.error


// proxy console.time


