const $NotificationContainer = document.createElement("div");
$NotificationContainer.id = "notification_container";
document.body.appendChild($NotificationContainer);
function createElements(icon) {
    let $alert = document.createElement("div");
    $alert.classList.add("notification");
    let $icon = document.createElement("box-icon");
    if (icon.type)
        $icon.setAttribute("type", icon.type);
    if (icon.name)
        $icon.setAttribute("name", icon.name);
    if (icon.color)
        $icon.setAttribute("color", icon.color);
    let $alertText = document.createElement("span");
    $alertText.classList.add("alert_text");
    $alert.append($icon, $alertText);
    $NotificationContainer.appendChild($alert);
    return { $alert, $icon, $alertText };
}
function setTextStyle(Style, $element) {
    if (Style && Style.fontWeight)
        $element.style.fontWeight = Style.fontWeight.toString();
    if (Style && Style.fontSize)
        $element.style.fontSize = Style.fontSize + "px";
    if (Style && Style.fontFamily)
        $element.style.fontFamily = Style.fontFamily;
    if (Style && Style.color)
        $element.style.color = Style.color;
}
function Alert({ message, alert_type, icon }, Options) {
    var _a, _b, _c, _d;
    let { $alert, $alertText, $icon } = createElements({
        type: (_a = icon.type) !== null && _a !== void 0 ? _a : "solid",
        color: (_b = icon.color) !== null && _b !== void 0 ? _b : "#fff",
        name: (_c = icon.name) !== null && _c !== void 0 ? _c : "bell"
    });
    let isKilled = false;
    if (!Options || !Options.html)
        $alertText.innerText = message;
    else
        $alert.innerHTML = Options.html;
    if (Options && Options.text)
        setTextStyle(Options.text, $alertText);
    if (!Options || !Options.custom_background)
        $alert.classList.add(alert_type);
    else
        $alert.style.background = !Options.custom_background.startsWith("#") ?
            "#" + Options.custom_background :
            Options.custom_background;
    if (!Options || !Options.timeless) {
        setTimeout(() => { isKilled = true; killNotification($alert, $alertText, $icon); }, Options && Options.time ? ((_d = Options.time.ms) !== null && _d !== void 0 ? _d : !Options.time.sec) ? 3000 : Options.time.sec * 1000 : 3000);
    }
    return {
        kill: () => {
            if (isKilled)
                throw "Cannot kill a killed alert";
            else
                killNotification($alert, $icon, $alertText);
        },
        addEvent(time, event_listener) {
            setTimeout((() => event_listener(this)).bind(this), time * 1000);
        },
        changeText(text) {
            if (isKilled)
                throw "Cannot kill a killed alert";
            if (!text)
                throw "Cannot change text without text!";
            $alertText.innerText = text;
        },
        changeType(new_type) {
            if (isKilled)
                throw "Cannot kill a killed alert";
            if (!new_type)
                throw "Cannot change type without type!";
            $alert.classList.remove(alert_type);
            $alert.classList.add(new_type);
            alert_type = new_type;
        },
        changeTextStyle(textStyle) {
            if (isKilled)
                throw "Cannot kill a killed alert";
            if (!textStyle)
                throw "Cannot change type without type!";
            setTextStyle(textStyle, $alertText);
        },
        changeIcon(icon) {
            if (isKilled)
                throw "Cannot kill a killed alert";
            if (!icon)
                throw "Cannot change icon without icon paramether";
            if (icon.type)
                $icon.setAttribute("type", icon.type);
            if (icon.color)
                $icon.setAttribute("color", icon.color);
            if (icon.name)
                $icon.setAttribute("name", icon.name);
        }
    };
}
function killNotification(...elements) {
    elements.forEach($element => {
        if ($element.classList.toString().includes("notification")) {
            $element.classList.add("fadeOut");
        }
        setTimeout(() => $element.remove(), 500);
    });
}
function start() {
    const $script = document.createElement("script");
    $script.src = "https://cdn.jsdelivr.net/gh/CarlosNunezMX/kuromi_alerts@main/boxicons.js";
    document.body.append($script);
    const $css = document.createElement("link");
    $css.rel = "stylesheet";
    $css.href = "https://cdn.jsdelivr.net/gh/CarlosNunezMX/kuromi_alerts@main/notify.lib.css";
    document.head.append($css);
}
start();
export { Alert };
