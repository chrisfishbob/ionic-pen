class Session {
    static getCookie(id) {
        id = id + "=";
        let cookiesArray = document.cookie.split(';');
        for(let cookie in cookiesArray) {
            while (cookie.charAt(0)==' ') 
                cookie = cookie.substring(1, cookie.length);
            if (cookie.indexOf(id) == 0) {
                return cookie.substring(id.length, cookie.length);
            }
        }
        return null;
    }

    static setCookie(id, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${id}=${value || ""}${expires}; path=/`;
    }
}

export default Session;