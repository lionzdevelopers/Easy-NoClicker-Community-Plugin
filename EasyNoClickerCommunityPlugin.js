/*
 * Name : Easy NoClicker Community Plugin
 * Description: Jquery  Plugin to open new url by hover (no clicking) and in same page or in new tab.
 * License: MIT license https://choosealicense.com/licenses/mit/
 * MIT License
 
 Copyright (c) [2018] [Bharat Kumar Rayala]
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
if (localStorage.getItem("noClicker") === null && localStorage.getItem("clickerOnOffExtn")=== null ) {
var hoverTimefree = 1000;
var clickerOnOfffree = 'off';
var hoverWaitColorfree= '#FFE4B5';
var hoverEnterOpacityfree=1;
var hoverLeaveOpacityfree=1;
if (localStorage.getItem("hovertimerfree") === null) {
    localStorage.setItem("hovertimerfree", hoverTimefree);
}
if (localStorage.getItem("clickerOnOfffree") === null) {
    localStorage.setItem("clickerOnOfffree", clickerOnOfffree);
}
$(document).ready(function () {
    $("body").append("<div id='settingsendfree' class='settingsendfree'><h5> Easy NoClicker Community Plugin settings : </h5> <button class='buttoner' id='noclickfree'>Click to stop noclick</button>  <button class='buttoner' id='yesclickfree'>Click to start noclick</button>Wait time before going to URL  : <input type='text' id='hoverwaitfree'/>milli seconds<button id='savedatafree' class='savedatafree buttoner'>Save</button></div>");
    $('#hoverwaitfree').val(localStorage.getItem("hovertimerfree"));
    $('#settingsendfree').css({
        'padding-left': "5%"
    });
    if (localStorage.getItem("clickerOnOfffree") === null) {
        $('#yesclickfree').show();
        $('#noclickfree').hide();
    }
    if (localStorage.getItem("clickerOnOfffree") === "on") {
        $('#yesclickfree').hide();
        $('#noclickfree').show();
    }
    if (localStorage.getItem("clickerOnOfffree") === "off") {
        $('#yesclickfree').show();
        $('#noclickfree').hide();
    }
    $(document).on('click', '#savedatafree', function () {
        localStorage.setItem("hovertimerfree", $("#hoverwaitfree").val());
    });
    $("#yesclickfree").on("click", function () {
        localStorage.setItem("clickerOnOfffree", "on");
        $('#noclickfree').show();
        $('#yesclickfree').hide();
    });
    $("#noclickfree").on("click", function () {
        localStorage.setItem("clickerOnOfffree", "off");
        $('#noclickfree').hide();
        $('#yesclickfree').show();
    });
    var intialtimeout;
    var urlvalueofthis;
    $(document).on('mouseleave', 'a', function () {
        if (localStorage.getItem("clickerOnOfffree") === "on")
        {
            var typeoftagname = $(this).prop("tagName");
            if (typeoftagname === 'A')
            {
                $(this).css("background-color", "transparent");
                  $(this).css("opacity", hoverLeaveOpacityfree);
                clearTimeout(intialtimeout);
            }
        }
    });
    $(document).on('mouseenter', 'a', function () {
        var typeoftagname = $(this).prop("tagName");
        if (typeoftagname === 'A')
        {
            urlvalueofthis = $(this).attr('href');
            var targettype = $(this).attr('target');
            if (localStorage.getItem("clickerOnOfffree") === "on")
            {
                $(this).css("background-color", hoverWaitColorfree);
                $(this).css("opacity", hoverEnterOpacityfree);
                intialtimeout = setTimeout(function () {
                    if ($('a:hover').length > 0) {
                        if (targettype)
                        {
                            window.open(urlvalueofthis, '_blank');// new tab 
                        } else
                        {
                            window.location.href = urlvalueofthis;
                        }
                        $('body').unbind('mouseenter mouseleave');
                    }
                }, localStorage.getItem("hovertimerfree"));
            }
        }
    });
});
    }