/*
                     global variables and constants
                    */
var fragments = [];
var currentIndex = 0;
var audioElement = document.getElementById("audioplayer");
var ainfo = "";
var cinfo = "";
var url;
var timeTextLastValue = 0;//fallback to this if an invalid time string is entered
var COMPLETED = "lightgreen";
var ACTIVE = "#c5c7dc";
var CLEAR = "";
var TRANSITION_TIMEOUT = 0.400;
/*
 variables that can be modified by the user at runtime
*/

/*
 do not remove the following lines starting with AENEAS_REPLACE_
*/
var timeStep = 0.1;
// AENEAS_REPLACE_TIME_STEP
var couple = true;
// AENEAS_REPLACE_COUPLE
var showID = false;
// AENEAS_REPLACE_SHOW_ID
var alignText = "center";
// AENEAS_REPLACE_ALIGN_TEXT
var playbackRate = 1.0;
// AENEAS_REPLACE_PLAYBACK_RATE
var continuousPlay = false;
// AENEAS_REPLACE_CONTINUOUS_PLAY
var timeFormatHHMMSSmmm = false;
// AENEAS_REPLACE_TIME_FORMAT
var transitionOffset = 0.100;
// AENEAS_REPLACE_TRANSITION_OFFSET
var outputFormat = "json";
// AENEAS_REPLACE_OUTPUT_FORMAT
var audioref = "";
// AENEAS_REPLACE_SMIL_AUDIOREF
var pageref = "";
// AENEAS_REPLACE_SMIL_PAGEREF
var playWindowTime = 2.0;
// AENEAS_REPLACE_PLAY_WINDOW_TIME
var playWindow = false;
// AENEAS_REPLACE_PLAY_WINDOW

/*
 do not remove the lines above starting with AENEAS_REPLACE_
*/

/*
 BEGIN INIT CODE
*/
bindEssentialListeners();
applyDefaults();

/*
 END INIT CODE
*/
function bindEssentialListeners() {
    try {
        document.getElementById("audioinput").addEventListener("change", buttonLoadAudio, false);
    } catch (e) {
        // pass
    }
    try {
        document.getElementById("fileinput").addEventListener("change", buttonLoadJSON, false);
    } catch (e) {
        // pass
    }
    try {
        document.getElementById("buttonAutoLoad").addEventListener("click", buttonAutoLoad, false);
    } catch (e) {
        // pass
    }
    try {
      let range = document.getElementById('playerprogress');
      range.addEventListener("mousedown", (e) => audioElement.pause());
      range.addEventListener("change", progressChange);
      range.addEventListener("input", progressInput);

    } catch (e) {
      // pass
    }
    try {
      audioElement.addEventListener('seeked', () => {
        if (!audioElement.paused) return;
        let cTime = audioElement.currentTime;
        highlight(CLEAR);
        currentIndex = fragments.findIndex(f => f.begin < cTime && cTime < f.end);
        playOverlay(0);
      });
    } catch(e) {
      //pass
    }
}

function applyDefaults() {
    try {
        document.getElementById("timeStep").value = timeStep;
        setButtonText("couple", couple, "ON", "OFF");
        setButtonText("buttonShowID", showID, "ON", "OFF");
        document.getElementById("alignText").value = alignText;
        document.getElementById("playbackRate").value = playbackRate;
        setButtonText("buttonContinuousPlay", continuousPlay, "ON", "OFF");
        setButtonText("buttonTimeFormat", timeFormatHHMMSSmmm, "HH:MM:SS.mmm", "DECIMAL");
        document.getElementById("transitionOffset").value = transitionOffset;
        document.getElementById("outputFormat").value = outputFormat;
        document.getElementById("smilAudioRef").value = audioref;
        document.getElementById("smilPageRef").value = pageref;
        document.getElementById("playWindowTime").value = playWindowTime;
        setButtonText("buttonPlayWindow", playWindow, "ON", "OFF");

        changeOutputFormat();
    } catch (e) {
        // pass
    }

    onIndexChanged();
}

function buttonAutoLoad() {
    // fake
    var audioFilePath = "file:///tmp/audio.mp3";
    // do not remove the next line
    // AENEAS_REPLACE_AUDIOFILEPATH
    // do not remove the line above
    loadAudio(audioFilePath);

    // fake
    fragments = [
        {"begin": "0.000", "end": "2.680", "id": "f000001", "language": "en", "lines": ["1"]},
        {
            "begin": "2.680",
            "end": "5.880",
            "id": "f000002",
            "language": "en",
            "lines": ["From fairest creatures we desire increase,"]
        },
        {
            "begin": "5.880",
            "end": "9.240",
            "id": "f000003",
            "language": "en",
            "lines": ["That thereby beauty's rose might never die,"]
        },
        {
            "begin": "9.240",
            "end": "11.760",
            "id": "f000004",
            "language": "en",
            "lines": ["But as the riper should by time decease,"]
        },
        {
            "begin": "11.760",
            "end": "14.440",
            "id": "f000005",
            "language": "en",
            "lines": ["His tender heir might bear his memory:"]
        },
        {
            "begin": "14.440",
            "end": "18.560",
            "id": "f000006",
            "language": "en",
            "lines": ["But thou contracted to thine own bright eyes,"]
        },
        {
            "begin": "18.560",
            "end": "22.280",
            "id": "f000007",
            "language": "en",
            "lines": ["Feed'st thy light's flame with self-substantial fuel,"]
        },
        {
            "begin": "22.280",
            "end": "25.480",
            "id": "f000008",
            "language": "en",
            "lines": ["Making a famine where abundance lies,"]
        },
        {
            "begin": "25.480",
            "end": "31.200",
            "id": "f000009",
            "language": "en",
            "lines": ["Thy self thy foe, to thy sweet self too cruel:"]
        },
        {
            "begin": "31.200",
            "end": "34.400",
            "id": "f000010",
            "language": "en",
            "lines": ["Thou that art now the world's fresh ornament,"]
        },
        {
            "begin": "34.400",
            "end": "36.960",
            "id": "f000011",
            "language": "en",
            "lines": ["And only herald to the gaudy spring,"]
        },
        {
            "begin": "36.960",
            "end": "40.640",
            "id": "f000012",
            "language": "en",
            "lines": ["Within thine own bud buriest thy content,"]
        },
        {
            "begin": "40.640",
            "end": "43.640",
            "id": "f000013",
            "language": "en",
            "lines": ["And tender churl mak'st waste in niggarding:"]
        },
        {
            "begin": "43.640",
            "end": "48.120",
            "id": "f000014",
            "language": "en",
            "lines": ["Pity the world, or else this glutton be,"]
        },
        {
            "begin": "48.120",
            "end": "53.240",
            "id": "f000015",
            "language": "en",
            "lines": ["To eat the world's due, by the grave and thee."]
        }
    ];
    // do not remove the next line
    // AENEAS_REPLACE_FRAGMENTS
    // do not remove the line above
    roundTimeValues();
    prepareTable();
    prepareControls();
}

function progressChange(e) {
  audioElement.currentTime = parseFloat(e.target.value);
  audioElement.play();
}

function progressInput(e) {
  let timer = document.getElementById('sectionTimer');
  timer.innerHTML = `${parseFloat(e.target.value).toFixed(3)} / ${formatTime(fragments[currentIndex].end)}`;
}


function buttonLoadAudio(evt) {
    var audioFile = evt.target.files[0];
    if (audioFile) {

        readBinaryStringFromBlob(audioFile, catchXingHeader);
        console.log(audioFile);
        function catchXingHeader(binary) {
            console.log(binary.slice(0,1000));
            xingMatch = binary.match(/(Info|Xing)\x00\x00\x00/);
            if(xingMatch){
                if(xingMatch[1] == 'Xing'){
                    alert('Your audio file seems to have variable bitrate. You should convert it to constant bitrate (with iTunes etc), otherwise it\'s meaningless to use this tool.');
                }
                if(xingMatch[1]=='Info' && navigator.userAgent.indexOf("Chrome")===-1){
                    alert('We strongly recommend that you use Google Chrome (because you seem to have the imprecise \'Xing\' seek tables in your CBR encoded MP3 file which are used by browsers other than Chrome).');
                }
            }
        };

        var audioFilePath = URL.createObjectURL(audioFile);
        loadAudio(audioFilePath);
        ainfo = "[Audio file: \"" + audioFile.name + "\"]";
        document.getElementById("audioLabel").innerHTML = audioFile.name;
        /*document.getElementById("step1").style.display = "none";*/
    } else {
        alert("Failed to load the audio file.");
    }
}

function loadAudio(audioFilePath) {
    audioElement.setAttribute("src", audioFilePath);
}

function buttonLoadJSON(evt) {
    var jsonFile = evt.target.files[0];
    if (jsonFile) {
        loadJSON(jsonFile);
    } else {
        alert("Failed to load the JSON file.");
    }
}

function loadJSON(jsonFile) {
    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            fragments = JSON.parse(e.target.result).fragments;
        } catch (e) {
            alert("Unable to parse the given JSON file.");
            return;
        }
        roundTimeValues();
        prepareTable();
        prepareControls();
        // cinfo = "[JSON file: \"" + jsonFile.name + "\"]";
        /*document.getElementById("step2").style.display = "none";*/
        document.getElementById("jsonLabel").innerHTML = jsonFile.name;
    };
    reader.readAsText(jsonFile);
}

function prepareControls() {
    // add event listeners
    for (var i = 0; i < fragments.length; i++) {
        if (showID) {
            document.getElementById(getStringID(i, "id")).addEventListener("click", fragmentClick);
        }
        document.getElementById(getStringID(i, "cell")).addEventListener("click", fragmentClick);
        document.getElementById(getStringID(i, "text")).addEventListener("click", fragmentClick);
        document.getElementById(getStringID(i, "text")).addEventListener("focusout", onLineTextFocusOut);
        //document.getElementById(getStringID(i, "time", "begin")).addEventListener("click", fragmentClick);
        //document.getElementById(getStringID(i, "time", "end")).addEventListener("click", fragmentClick);
        document.getElementById(getStringID(i, 'time', 'begin')).addEventListener('focusin', onTimeTextFocusIn);
        document.getElementById(getStringID(i, 'time', 'begin')).addEventListener('focusout', onTimeTextFocusOut);

        document.getElementById(getStringID(i, 'time', 'end')).addEventListener('focusin', onTimeTextFocusIn);
        document.getElementById(getStringID(i, 'time', 'end')).addEventListener('focusout', onTimeTextFocusOut);

        document.getElementById(getStringID(i, "increase", "begin")).addEventListener("click", increaseClick);
        document.getElementById(getStringID(i, "decrease", "begin")).addEventListener("click", decreaseClick);

        document.getElementById(getStringID(i, "increase", "end")).addEventListener("click", increaseClick);
        document.getElementById(getStringID(i, "decrease", "end")).addEventListener("click", decreaseClick);

        function getDeleteFragFunction(i) {
          return () => deleteFragment(i);
        }

        document.getElementById(`delete-${i}`).addEventListener("click", getDeleteFragFunction(i));
    }


    //document.getElementById("stop").addEventListener("click", stopOverlay);
    document.getElementById("couple").addEventListener("click", changeCouple);
    document.getElementById("buttonShowID").addEventListener("click", changeShowID);
    document.getElementById("alignText").addEventListener("change", changeAlignText);
    document.getElementById("buttonContinuousPlay").addEventListener("click", changeContinuousPlay);
    document.getElementById("buttonTimeFormat").addEventListener("click", changeTimeFormat);
    document.getElementById("timeStep").addEventListener("change", changeTimeStep);
    document.getElementById("transitionOffset").addEventListener("change", changeTransitionOffset);
    document.getElementById("buttonPlayWindow").addEventListener("click", changePlayWindow);
    document.getElementById("playWindowTime").addEventListener("change", changePlayWindowTime);
    document.getElementById("playbackRate").addEventListener("change", changePlaybackRate);
    document.getElementById("outputFormat").addEventListener("change", changeOutputFormat, false);
    document.getElementById("download").addEventListener("click", downloadClick);
}

function changeShowID() {
    showID = !showID;
    setButtonText("buttonShowID", showID, "ON", "OFF");
    prepareTable();
    prepareControls();
}

function changeCouple() {
    couple = !couple;
    setButtonText("couple", couple, "ON", "OFF");
}

function changeAlignText() {
    alignText = document.getElementById("alignText").value;
    applyAlignment();
}

function applyAlignment() {
    for (var i = 0; i < fragments.length; i++) {
        document.getElementById(getStringID(i, "cell")).style.textAlign = alignText;
    }
}

function changeOutputFormat() {
    var outputFormat = document.getElementById("outputFormat").value;
    var disp = "none";
    if (outputFormat == "smil") {
        disp = "block";
    }
    document.getElementById("smilAudioRef").style.display = disp;
    document.getElementById("smilPageRef").style.display = disp;
}

function changeTimeStep() {
    timeStep = parseFloat(document.getElementById("timeStep").value);
}

function changeTransitionOffset() {
    transitionOffset = parseFloat(document.getElementById("transitionOffset").value);
}

function changePlaybackRate() {
    audioElement.playbackRate = parseFloat(document.getElementById("playbackRate").value);
}

function changeContinuousPlay() {
    continuousPlay = !continuousPlay;
    setButtonText("buttonContinuousPlay", continuousPlay, "ON", "OFF");
}

function changePlayWindow() {
    playWindow = !playWindow;
    setButtonText("buttonPlayWindow", playWindow, "ON", "OFF");
}

function changePlayWindowTime() {
    playWindowTime = parseFloat(document.getElementById("playWindowTime").value);

}

function changeTimeFormat() {
    timeFormatHHMMSSmmm = !timeFormatHHMMSSmmm;
    setButtonText("buttonTimeFormat", timeFormatHHMMSSmmm, "HH:MM:SS.mmm", "DECIMAL");
    updateTime();
}

function setButtonText(element, variable, true_text, false_text) {
    var text = false_text;
    if (variable) {
        text = true_text;
    }
    document.getElementById(element).innerHTML = text;
}

function updateTimeForSegment(segment_position = "begin") {
    if (i == null) {
        for (var i = 0; i < fragments.length; i++) {
            if (!fragments[i]) continue;
            var position = fragments[i][segment_position];
            document.getElementById(getStringID(i, "time", segment_position)).innerHTML = formatTime(position);
        }
    } else {
        var position = fragments[i][segment_position];
        document.getElementById(getStringID(i, "time", segment_position)).innerHTML = formatTime(position);
    }
}


function updateTime(i, segment_position = "begin") {
    if (segment_position === "begin") {
        updateTimeForSegment("begin")
    } else {
        updateTimeForSegment("end")
    }
}

function formatTime(time_value) {
    if (timeFormatHHMMSSmmm) {
        return timeHHMMSSmmm(time_value, ".");
    }
    return time_value.toFixed(3);
}

function getStringID(i, element, segment_position = "begin") {
    if (element == "id") {
        return ("id" + i);
    }
    if (element == "cell") {
        return ("c" + i);
    }
    if (element == "text") {
        return ("f" + i);
    }
    if (element == "time") {
        return ("t" + i + segment_position);
    }
    if (element == "increase") {
        return ("t" + i + "inc" + segment_position);
    }
    if (element == "decrease") {
        return ("t" + i + "dec" + segment_position);
    }
    return ("" + i);
}

function getID(idstring) {
    var s = idstring;
    s = s.replace("inc", "");
    s = s.replace("dec", "");
    s = s.replace("id", "");
    s = s.replace("c", "");
    s = s.replace("t", "");
    s = s.replace("f", "");
    s = s.replace("end", "");
    s = s.replace("begin", "");
    return parseInt(s);
}

function roundTimeValues() {
    for (var i = 0; i < fragments.length; i++) {
        fragments[i].begin = roundTimeValue(fragments[i].begin);
        fragments[i].end = roundTimeValue(fragments[i].end);
    }
}

function prepareTable() {
    var rows = [];
    for (var i = 0; i < fragments.length; ++i) {
        var id = fragments[i].id;
        var text = fragments[i].lines.join("<br/>");
        var begin = fragments[i].begin;
        var end = fragments[i].end;
        var row = "";
        row += `<div id="fragment-${i}" class="row" style="padding-top:5px;padding-bottom:5px;border-bottom:1px solid #e2e3ed;margin-left:15px;margin-right:15px;">`;
        if (showID) {
            row += `<div class="col-2 info-col" id="${getStringID(i, "id")}">
                      <div> ${id} </div>
                      <div id="delete-${i}"class="btn btn-danger"><i class="fa fa-trash"></i></div>
                    </div>`;
        } else {
          row += `<div class="col-2 info-col" id="${getStringID(i, "id")}">
                    <div id="delete-${i}" class="btn btn-danger"><i class="fa fa-trash"></i></div>
                  </div>`;
        }
        row += '<div class="col" style="display: table-cell; vertical-align: middle;" id="' + getStringID(i, "cell") + '"><a class="text" id="' + getStringID(i, "text") + '" contenteditable="true">' + text + '<\/a><\/div>';
        row += '<div class="edit col-4">';

        row += '<div style="display:block;margin-bottom:10px;">';
        row += '<p style="display:inline;" class="adjust-label">Start</p>';
        row += '<a class="time" id="' + getStringID(i, "time", "begin") + '" contenteditable="true">' + formatTime(begin) + '<\/a>';
        row += '<a class="increase" id="' + getStringID(i, "increase", "begin") + '">+<\/a>';
        row += '<a class="decrease" id="' + getStringID(i, "decrease", "begin") + '">−<\/a>';
        row += '</div>';

        row += '<div style="display:block;">';
        row += '<p style="display:inline;" class="adjust-label">End</p>';
        row += '<a class="time" id="' + getStringID(i, "time", "end") + '" contenteditable="true">' + formatTime(end) + '<\/a>';
        row += '<a class="increase" id="' + getStringID(i, "increase", "end") + '">+<\/a>';
        row += '<a class="decrease" id="' + getStringID(i, "decrease", "end") + '">−<\/a>';
        row += '</div>';

        row += "<\/div>";
        row += '<\/div>';
        rows[i] = row;
    }
    var colID = "";
    if (showID) {
        colID = '<col width="100">';
    }
    document.getElementById("tb").innerHTML = '<div>' + rows.join("") + "<\/div>";
    applyAlignment();
}

function roundTimeValue(time) {
    return Math.round(time * 1000) / 1000;
}

function highlight(style) {
    try {
        document.getElementById(getStringID(currentIndex, "cell")).style.backgroundColor = style;
    } catch (e) {
        // pass
    }
}

function fragmentClick(evt) {
    highlight(CLEAR);
    currentIndex = getID(evt.target.id);
    playOverlay(0);
}

function onTimeTextFocusIn(e) {
  timeTextLastValue = e.target.innerHTML
}

function onTimeTextFocusOut(e) {

  //nothing has changed
  if (e.target.innerHTML === timeTextLastValue) return;

  let isDecimalFormat = /^\d*\.?\d*$/.test(e.target.innerHTML);

  if (isDecimalFormat) {
    //This is magic that attempts to avoid floating point precision errors
    let rounded = parseFloat((parseFloat(e.target.innerHTML) - parseFloat(timeTextLastValue)).toFixed(3));
    changeTime(e, rounded);
  } else {
    alert("Invalid time value entered");
    e.target.innerHTML = timeTextLastValue;
  }
}

function onLineTextFocusOut(e) {
  var i = getID(e.target.id);
  fragments[i].lines = e.target.innerText.split(/[\r\n]+/g);
}

function deleteFragment(deleteIdx) {

  let fragmentRow = document.getElementById('fragment-' + deleteIdx);
  let fragmentTrueIndex = Array.from(fragmentRow.parentNode.children).indexOf(fragmentRow);

  if (fragmentTrueIndex === 0) {
    let el = null;
    let siblingFragment = null;
    for(let i = deleteIdx + 1; i < fragments.length; i++ ) {
      if (fragments[i] !== undefined) {
        siblingFragment = fragments[i];
        el = document.getElementById(getStringID(i, 'time', 'begin'));
        break;
      }
    }

    siblingFragment.begin = fragments[deleteIdx].begin;
    el.innerHTML = (siblingFragment.begin).toFixed(3);
  } else if (fragments.length > 1) {
    let el = null;
    let siblingFragment = null;
    for(let i = deleteIdx - 1; i >= 0; i-- ) {
      if (fragments[i] !== undefined) {
        siblingFragment = fragments[i];
        el = document.getElementById(getStringID(i, 'time', 'end'));
        break;
      }
    }

    siblingFragment.end = fragments[deleteIdx].end;
    el.innerHTML = (siblingFragment.end).toFixed(3);
  }

  fragmentRow.remove();
  delete fragments[deleteIdx];
}

function increaseClick(evt) {
    changeTime(evt, timeStep);
}

function decreaseClick(evt) {
    changeTime(evt, -timeStep);
}

function changeTime(evt, step) {
    var i = getID(evt.target.id);
    if (evt.target.id.indexOf("begin") > -1) {
        /* increase/decrease begin*/
        fragments[i].begin = roundTimeValue(fragments[i].begin + step);
        if (fragments[i].begin < 0) {
            fragments[i].begin = 0.00;
        }
        updateTime(i, "begin");
        if (couple && (i > 0)) {
            let prevFragment, j = i - 1;
            do {
              prevFragment = fragments[j];
            } while (!prevFragment && j-- >= 0);
            prevFragment.end = fragments[i].begin;
            updateTime(j, "end");
        }
        highlight(CLEAR);
        currentIndex = i;
        playOverlay(0);
    } else {
        /* increase/decrease begin*/
        fragments[i].end = roundTimeValue(fragments[i].end + step);
        if (fragments[i].end < 0) {
            fragments[i].end = 0.00;
        }
        updateTime(i, "end");
        if (couple && (i+1 < fragments.length)) {
            let nextFragment, j = i + 1;
            do {
              nextFragment = fragments[j];
            } while (!nextFragment && j++ < fragments.length);

            nextFragment.begin = fragments[i].end;
            updateTime(j, "begin");
        }
        highlight(CLEAR);
        currentIndex = i;
        playOverlay(0);
    }

}

function downloadData() {
    var aElement = document.createElement("a");
    aElement.style = "display: none";
    document.body.appendChild(aElement);
    return function (data, fileName) {
        blob = new Blob([data], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        aElement.href = url;
        aElement.download = fileName;
        aElement.click();
    };
}

function triggerDownload(data, fileName) {
    setTimeout(function () {
        var df = downloadData();
        df(data, fileName);
    }, 500);
    window.URL.revokeObjectURL(url);
}

function downloadClick() {
    var outputFormat = document.getElementById("outputFormat").value;
    var data = null;
    let frags = fragments.filter(f => !!f);
    switch (outputFormat) {
        case "csv":
            data = downloadCSV(frags);
            break;
        case "json":
            data = downloadJSON(frags);
            break;
        case "smil":
            data = downloadSMIL(frags);
            break;
        case "srt":
            data = downloadSRT(frags);
            break;
        case "ssv":
            data = downloadSSV(frags);
            break;
        case "ttml":
            data = downloadTTML(frags);
            break;
        case "tsv":
            data = downloadTSV(frags);
            break;
        case "txt":
            data = downloadTXT(frags);
            break;
        case "vtt":
            data = downloadVTT(frags);
            break;
        case "xml":
            data = downloadXML(frags);
            break;
        default:
            data = downloadJSON(frags);
    }
    var message = "The modified " + outputFormat.toUpperCase() + " file will be saved in your default Download directory. Please enter a file name:";
    var suggestedFileName = "tuned." + outputFormat;
    var fileName = prompt(message, suggestedFileName);
    triggerDownload(data, fileName);
}

function downloadCSV(frags) {
    var lines = [];
    for (var i = 0; i < frags.length; ++i) {
        lines[i] = frags[i].id + "," + frags[i].begin + "," + frags[i].end + ',"' + frags[i].lines.join(" ") + '"';
    }
    return lines.join("\n");
}

function downloadJSON(frags) {
    var jsonData = {};
    jsonData.fragments = frags;

    // convert the numbers to strings (as in the original JSON)
    function numberToString(key, value) {
        if (typeof value === "number") {
            value = value.toString();
        }
        return value;
    }

    return JSON.stringify(jsonData, numberToString, " ");
}

function downloadSMIL(frags) {
    var audioref = document.getElementById("smilAudioRef").value;
    var pageref = document.getElementById("smilPageRef").value;
    var lines = [];
    var j = 0;
    lines[j++] = '<smil xmlns:epub="http://www.idpf.org/2007/ops" xmlns="http://www.w3.org/ns/SMIL" version="3.0">';
    lines[j++] = '  <body>';
    lines[j++] = '    <seq id="s000001" epub:textref="' + pageref + '">';
    for (var i = 0; i < frags.length; ++i) {
        lines[j++] = '      <par id="p' + pad(i + 1, 6) + '">';
        lines[j++] = '        <text src="' + pageref + '#' + frags[i].id + '"/>';
        lines[j++] = '        <audio src="' + audioref + '" clipBegin="' + timeSMIL(frags[i].begin) + '" clipEnd="' + timeSMIL(frags[i].end) + '"/>';
        lines[j++] = '      <\/par>';
    }
    lines[j++] = '    <\/seq>';
    lines[j++] = '  <\/body>';
    lines[j++] = '<\/smil>';
    return lines.join("\n");
}

function downloadSRT(frags) {
    var lines = [];
    var j = 0;
    for (var i = 0; i < frags.length; ++i) {
        lines[j++] = "" + (i + 1);
        lines[j++] = timeSRT(frags[i].begin) + " --> " + timeSRT(frags[i].end);
        var f_lines = frags[i].lines;
        for (var k = 0; k < f_lines.length; ++k) {
            lines[j++] = f_lines[k];
        }
        lines[j++] = ""
    }
    return lines.join("\n") + "\n";
}

function downloadSSV(frags) {
    var lines = [];
    for (var i = 0; i < frags.length; ++i) {
        lines[i] = frags[i].begin + " " + frags[i].end + " " + frags[i].id + ' "' + frags[i].lines.join(" ") + '"';
    }
    return lines.join("\n");
}

function downloadTTML(frags) {
    var lines = [];
    var j = 0;
    lines[j++] = "<?xml version='1.0' encoding='UTF-8'?>";
    lines[j++] = '<tt xmlns="http://www.w3.org/ns/ttml" xml:lang="">';
    lines[j++] = '  <body>';
    lines[j++] = '    <div>';
    for (var i = 0; i < frags.length; ++i) {
        lines[j++] = '      <p xml:id="' + frags[i].id + '" begin="' + frags[i].begin + 's" end="' + frags[i].end + 's">' + frags[i].lines.join("<br/>") + '<\/p>';
    }
    lines[j++] = '    <\/div>';
    lines[j++] = '  <\/body>';
    lines[j++] = '<\/tt>';
    return lines.join("\n");
}

function downloadTSV(frags) {
    var lines = [];
    for (var i = 0; i < frags.length; ++i) {
        lines[i] = frags[i].begin + "\t" + frags[i].end + "\t" + frags[i].id;
    }
    return lines.join("\n");
}

function downloadTXT(frags) {
    var lines = [];
    for (var i = 0; i < frags.length; ++i) {
        lines[i] = frags[i].id + " " + frags[i].begin + " " + frags[i].end + ' "' + frags[i].lines.join(" ") + '"';
    }
    return lines.join("\n");
}

function downloadVTT(frags) {
    var lines = [];
    var j = 0;
    lines[j++] = "WEBVTT\n"
    for (var i = 0; i < frags.length; ++i) {
        lines[j++] = "" + (i + 1);
        lines[j++] = timeVTT(frags[i].begin) + " --> " + timeVTT(frags[i].end);
        var f_lines = frags[i].lines;
        for (var k = 0; k < f_lines.length; ++k) {
            lines[j++] = f_lines[k];
        }
        lines[j++] = ""
    }
    return lines.join("\n") + "\n";
}

function downloadXML(frags) {
    var lines = [];
    var j = 0;
    lines[j++] = "<?xml version='1.0' encoding='UTF-8'?>";
    lines[j++] = '<map>';
    for (var i = 0; i < frags.length; ++i) {
        lines[j++] = '  <fragment id="' + frags[i].id + '" begin="' + frags[i].begin + '" end="' + frags[i].end + '">';
        var f_lines = frags[i].lines;
        for (var k = 0; k < f_lines.length; ++k) {
            lines[j++] = '    <line>' + f_lines[k] + '<\/line>';
        }
        lines[j++] = '  <\/fragment>';
    }
    lines[j++] = '<\/map>';
    return lines.join("\n");
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

function timeHHMMSSmmm(time_value, decimal_separator) {
    var tmp = parseFloat(time_value);
    var hours = parseInt(Math.floor(tmp / 3600));
    tmp -= (hours * 3600);
    var minutes = parseInt(Math.floor(tmp / 60));
    tmp -= minutes * 60;
    var seconds = parseInt(Math.floor(tmp));
    tmp -= seconds;
    var milliseconds = parseInt(Math.floor(tmp * 1000));
    return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + decimal_separator + pad(milliseconds, 3);
}

function timeSMIL(time_value) {
    return timeHHMMSSmmm(time_value, ".");
}

function timeSRT(time_value) {
    return timeHHMMSSmmm(time_value, ",");
}

function timeVTT(time_value) {
    return timeHHMMSSmmm(time_value, ".");
}

function ticker(cTime) {
    // TODO ALPE use a global stopwatch object

    // "timeupdate" alone isn't accurate enough
    // to pause exactly at the end of the fragment.
    // Another option is to use temporal dimensions
    // for audio source but Chrome doesn't support it with blobs.
    // If in the last TRANSITION_TIMEOUT seconds, calculate the time left,
    // and set a corresponding timeout to pause the fragment.

    /* playWindowTime lets the user listen to only part of the sentence, beginning and end
    * for quicker annotations */

    if (!fragments || !fragments[currentIndex]) return;

    if (playWindow === true && (fragments[currentIndex].end - fragments[currentIndex].begin) > (playWindowTime * 2)) {
        if ((cTime > fragments[currentIndex].begin + playWindowTime) && (cTime < fragments[currentIndex].end - playWindowTime)) {
            audioElement.currentTime = fragments[currentIndex].end - playWindowTime;
            audioElement.play();
        }
    }

    if (cTime > fragments[currentIndex].end - TRANSITION_TIMEOUT) {
        // subtract transitionOffset seconds to account for the delay introduced by this code
        var timeLeft = (fragments[currentIndex].end - cTime - transitionOffset) * 1000 / audioElement.playbackRate;
        var index = currentIndex;
        setTimeout(function () {
            // do not perform action if the user
            // jumped to another fragment
            if (index == currentIndex) {
                if (continuousPlay) {
                    playOverlay(1);
                } else {
                    highlight(COMPLETED);
                    stopOverlay();
                }
            }
        }, timeLeft)
    }
    // display current time
    let timer = document.getElementById('sectionTimer');
    let range = document.getElementById('playerprogress');
    //var percentageCompleted = ((cTime.toFixed(3) - fragments[currentIndex].begin) / (fragments[currentIndex].end - fragments[currentIndex].begin)) * 100;
    range.value = cTime;
    timer.innerHTML = `${cTime.toFixed(3)} / ${formatTime(fragments[currentIndex].end)}`;
}

function stopOverlay() {
    audioElement.pause();
}

//update the section crubber info
function onIndexChanged() {
  if (!fragments[currentIndex]) return;

  let timer = document.getElementById('sectionTimer');
  let range = document.getElementById('playerprogress');

  let start = fragments[currentIndex].begin;
  let end = fragments[currentIndex].end;
  range.min = start;
  range.max = end;
  timer.innerHTML = `${formatTime(start)} / ${formatTime(end)}`;
}

function playOverlay(inc) {
    highlight(CLEAR);
    if (currentIndex + inc < fragments.length) {
        onIndexChanged();
        currentIndex += inc;
        highlight(ACTIVE);
        audioElement.currentTime = fragments[currentIndex].begin;
        audioElement.play();
    } else {
        stopOverlay();
    }
}
function readBinaryStringFromBlob(blob, callback, ie, ie10) {
    var reader = new FileReader();
    if(!ie) {
        reader.addEventListener("loadend", function () {
            callback(reader.result);
        });
        try {
            reader.readAsBinaryString(blob);
        } catch (err) {
            readBinaryStringFromBlob(blob, callback, true);
        }
    }
    else if (!ie10){
        try {
            window.URL = window.URL || window.webkitURL;
            var blobURL = URL.createObjectURL(blob);
            var xhr = new XMLHttpRequest;
            xhr.open("get", blobURL);
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
            xhr.onload = function () {
                callback(xhr.response);
            };
            xhr.send();
        } catch (err) {
            readBinaryStringFromBlob(blob, callback, true, true);
        }
    }
    else {
        reader.addEventListener("loadend", function () {
            var binary = "";
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            callback(binary);
        });
        reader.readAsArrayBuffer(blob);
    }
}
