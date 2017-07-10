function isurl(str) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
}
var serverConnected = false,
    clanName = '',
    knownSkins = [],
    streaks = [],
    pastClans = {};
function plz() {
  var clr = Please.make_color({colors_returned:50,saturation:1,value:1});
  return clr[Math.floor(Math.random()*clr.length)];
}
(function(wHandle, wjQuery) {
     var playerName = '',
         hiscore = 0,
         skinRotation = 0,
         connectionTries = 0,
         color = {
          "red": "#FF3333",
          "green": "#33FF33",
          "blue": "#3333FF",
          "yellow": "#FFFF33",
          "cyan": "#33FFFF",
          "magenta": "#FF33FF",
          "orange": "#FF8833"
        }
    var firstPlace = '', firstPlaceClan = '';
    if (navigator.appVersion.indexOf("MSIE") != -1)
     alert("You're using a pretty old browser, some parts of the website might not work properly.");

    Date.now || (Date.now = function() {
        return (+new Date).getTime();
    });
    Array.prototype.peek = function() {
        return this[this.length - 1];
    };
    var CONNECT_TO,
        SKIN_URL = "./skins/",
        USE_HTTPS = false,
        BORDER_DEFAULT = {
            top: -2E3,
            left: -2E3,
            right: 2E3,
            bottom: 2E3
        },
        PI_2 = Math.PI * 2,
        SEND_254 = new Uint8Array([254, 6, 0, 0, 0]),
        SEND_255 = new Uint8Array([255, 1, 0, 0, 0]),
        UINT8_CACHE = {
            1: new Uint8Array([1]),
            17: new Uint8Array([17]),
            21: new Uint8Array([21]),
            18: new Uint8Array([18]),
            19: new Uint8Array([19]),
            22: new Uint8Array([22]),
            23: new Uint8Array([23]),
            24: new Uint8Array([24]),
            254: new Uint8Array([254])
        }
        FPS_MAXIMUM = 1000,
        ws = null,
        disconnectDelay = 1;

    function Disconnect() {
        if (!ws) return;
        ws.onopen = null;
        ws.onmessage = null;
        ws.onerror = null;
        ws.onclose = null;
        ws.close();
        showESCOverlay();
        if (serverStatID) {
            clearInterval(serverStatID);
            serverStatID = null;
        }
        ws = null;
        resetGameVariables();
        serverConnected = false;
        NProgress.done();
    }

    function resetGameVariables() {
        nodesID = { };
        nodes = [];
        myNodes = [];
        deadNodes = [];
        qTree = null;
        leaderboard = [];
        leaderboardType = "none";
        userScore = 0;
        centerX = 0;
        centerY = 0;
        lastMessageTime = -1;
        latency = -1;
        _cX = 0;
        _cY = 0;
        _cZoom = 1;
        mapCenterSet = false;
        border = BORDER_DEFAULT;
        loadedSkins = [];
        viewZoom = 1;
        chatText = "";
        gameType = -1;
        serverVersion = "Unknown";
        serverStats = null;
        leaderboardCanvas = null;
        serverStatCanvas = null;
    }

    function Connect(to) {
        if (ws) Disconnect();
        userName = $('#nick').val();
        ws = new WebSocket((USE_HTTPS ? "wss://" : "ws://") + (CONNECT_TO = to));
        ws.binaryType = "arraybuffer";
        ws.onopen = WsOpen;
        ws.onmessage = WsMessage;
        ws.onerror = WsError;
        ws.onclose = WsClose;
        $('#serverConnectingText').html('Connecting...');
        $('#serverConnecting').show();
        $('#mainButtons').hide();
    }

    function WsOpen() {
        userName = $('#nick').val();
        clanName = $('#clan').val();
        disconnectDelay = 1;
        serverConnected = true;
        msend(7);
        WsSend(SEND_254);
        WsSend(SEND_255);
        serverVersion = "Unknown";
        log.info('Connection established successfully!');
        $('#serverConnecting').hide();
        $('#mainButtons').show();
        NProgress.done()
    }

    function WsMessage(data) {
        var reader = new Reader(new DataView(data.data), 0, true),
            i, count,
            packet = reader.getUint8();
        switch (packet) {
            case 0x20:
                // New cell of mine
                myNodes.push(reader.getUint32());
                break;
            case 0x63:
                // Chat message
                var flags = reader.getUint8(),
                    name, message, nameColor;

                var r = reader.getUint8(),
                    g = reader.getUint8(),
                    b = reader.getUint8(),
                    nameColor = (r << 16 | g << 8 | b).toString(16);
                while (nameColor.length < 6) nameColor = '0' + nameColor;
                nameColor = '#' + nameColor;
                name = reader.getStringUTF8().trim();

                // Replace {skin} with empty string
                var reg = /\[([^]+)\]/.exec(name);
                if (reg && reg.length === 2) {
                  if ($.inArray(reg[1],knownSkins) === -1) name = name.replace(reg[0], "").trim();
                }

                // Prefix for mods, admins & server
                var server = !!(flags & 0x80),
                    admin = !!(flags & 0x40),
                    mod = !!(flags & 0x20);

                if (server && name !== "SERVER") name = "[SERVER] " + name;
                if (admin) name = "[ADMIN] " + name;
                if (mod) name = "[MOD] " + name;

                message = reader.getStringUTF8();
                chatAlphaWait += Math.max(3000, 1000 + message.length * 150);
                chatMessages.push({
                    server: server,
                    admin: admin,
                    mod: mod,
                    nameColor: nameColor,
                    name: name,
                    message: message,
                    time: Date.now()
                });
                sfx('chat');
                drawChat();
                break;
            case 0x12:
                // Clear all
                for (var i in nodesID) nodesID[i].destroy(Date.now());
            case 0x14:
                // Clear nodes (case 0x12 slips here too)
                myNodes = [];
                break;
            case 0x15:
                // Draw line
                // Unimplemented
                break;
            case 0xFE:
                // Server stat
                serverStats = JSON.parse(reader.getStringUTF8());
                latency = Date.now() - lastMessageTime;
                drawServerStat();
                break;
            case 0x40:
                // Set border
                border.left = reader.getFloat64();
                border.top = reader.getFloat64();
                border.right = reader.getFloat64();
                border.bottom = reader.getFloat64();
                if (data.data.byteLength !== 33) {
                    // Game type and server name is given
                    gameType = reader.getUint32();
                    serverVersion = "Popsplit.us";
                    if (serverVersion.includes('Popsplit.us') && !serverStatID) {
                        serverStatID = setInterval(function() {
                            // Server stat
                            lastMessageTime = Date.now();
                            WsSend(UINT8_CACHE[254]);
                        }, 2000);
                    }
                }

                if (0 === myNodes.length && !mapCenterSet) {
                    mapCenterSet = true;
                    _cX = (border.right + border.left) / 2;
                    _cY = (border.bottom + border.top) / 2;
                    centerX = _cX;
                    centerY = _cY;
                }
                break;
            // Leaderboard update packets
            case 0x30:
                // Text list, somewhat deprecated
                leaderboard = [];
                if (leaderboardType != 0x30) {
                    leaderboardType = 0x30;
                    log.info("Got somewhat deprecated leaderboard type 48 (0x30). Server-side is possibly Ogar")
                }

                count = reader.getUint32();
                for (i = 0; i < count; ++i)
                    leaderboard.push(reader.getStringUTF8());
                drawLeaderboard();
                break;
            case 0x31:
                // FFA list
                leaderboard = [];
                leaderboardType = 0x31;
                count = reader.getUint32();
                for (i = 0; i < count; ++i) {
                    leaderboard.push({
                        me: reader.getUint32(),
                        name: reader.getStringUTF8() || "An unnamed cell"
                    });
                }
                drawLeaderboard();
                break;
            case 0x32:
                // Pie chart
                leaderboard = [];
                leaderboardType = 0x32;
                count = reader.getUint32();
                for (i = 0; i < count; ++i)
                    leaderboard.push(reader.getFloat32());
                drawLeaderboard();
                break;
            case 0x10:
                // Update nodes
                var killer, killed, id, node, x, y, size, flags,
                    updColor, updName, updSkin, // Flags
                    time = Date.now();

                // Consume records
                count = reader.getUint16();
                for (var i = 0; i < count; i++) {
                    killer = reader.getUint32();
                    killed = reader.getUint32();
                    if (!nodesID.hasOwnProperty(killer) || !nodesID.hasOwnProperty(killed)) continue;
                    nodesID[killed].killer = nodesID[killer];
                    nodesID[killed].destroy();
                }

                // Node update records
                while (1) {
                    id = reader.getUint32();
                    if (0 === id) break;

                    x = reader.getInt32();
                    y = reader.getInt32();
                    size = reader.getUint16();

                    flags = reader.getUint8();
                    updColor = !!(flags & 0x02);
                    updName = !!(flags & 0x08);
                    updSkin = !!(flags & 0x04);
                    var color = null,
                        name = null,
                        skin = null,
                        tmp = "";

                    if (updColor) {
                        color = "";
                        for (var r = reader.getUint8(), g = reader.getUint8(), b = reader.getUint8(),
                            color = (r << 16 | g << 8 | b).toString(16); 6 > color.length;) color = "0" + color;
                        color = "#" + color;
                    }

                    if (updSkin) skin = reader.getStringUTF8();
                    if (updName) name = reader.getStringUTF8();

                    if (nodesID.hasOwnProperty(id)) {
                        node = nodesID[id];
                        node.nx = x;
                        node.ny = y;
                        node.nSize = size;
                        updColor && (node.setColor(color));
                        updName && name && (node.setName(name));
                        updSkin && skin && (node.setSkin(skin));
                        node.updateStamp = time;
                    } else {
                        node = new Cell(id, x, y, size, name || "", color || "#FFFFFF", skin || "", time, flags);
                        nodesID[id] = node;
                        nodes.push(node);
                    }
                }

                // Dissapear records
                count = reader.getUint16();
                for (i = 0; i < count; i++) {
                    killed = reader.getUint32();
                    if (nodesID.hasOwnProperty(killed)) nodesID[killed].destroy(time);
                }

                // List through cells and if it wasn't updated mark it as pellet
                count = nodes.length;
                for (i = 0; i < count; i++) {
                    node = nodes[i];

                    if (node.isPellet || node.notPellet || node.isVirus || node.isAgitated || node.isEjected) continue;
                    if (node.updateStamp !== time && node.birthStamp !== time) {
                        // Node is a pellet - draw cache
                        var _nCache = document.createElement('canvas');
                        var pCtx = _nCache.getContext('2d'),
                            lW = this.nSize > 20 ? Math.max(this.nSize * .01, 10) : 0, sz;
                        _nCache.width = (sz = node.nSize + lW) * 2;
                        _nCache.height = sz * 2;
                        pCtx.lineWidth = lW;
                        pCtx.lineCap = pCtx.lineJoin = "round";
                        pCtx.fillStyle = node.color;
                        pCtx.strokeStyle = node.color;

                        pCtx.beginPath();
                        pCtx.arc(sz, sz, node.nSize - lW, 0, 2 * Math.PI, false);
                        pCtx.fill();
                        pCtx.closePath();
                        node._meCache = _nCache;
                        node._meW = _nCache.width / 2;
                        node._meH = _nCache.height / 2;
                        node.isPellet = true;
                    } else if (node.updateStamp === time && node.birthStamp !== time)
                        // Not a pellet
                        node.notPellet = true;
                }
                break;
            case 0x11:
                // Update position (spectate packet)
                _cX = reader.getFloat32();
                _cY = reader.getFloat32();
                _cZoom = reader.getFloat32();
                break;
            default:
                log.err("Got unexpected packet ID " + packet)
                Disconnect();
        }
    }
  
    function addChat(a,b,c) {
      chatMessages.push({
          server: false,
          admin: false,
          mod: false,
          nameColor: c,
          name: a,
          message: b,
          time: Date.now()
      });
      drawChat();
    }

    function WsError(e) {
        clanName = $('#clan').val();
        userName = $('#nick').val();
        log.warn("Connection error");
        log.debug(e);
        serverConnected = false;
        NProgress.done();
        connectionTries++
        if (connectionTries > 3) {
          connectionTries = 0;
          connector('random');
        } else {
          connector();
        }
    }

    function WsClose() {
        clanName = $('#clan').val();
        userName = $('#nick').val();
        log.debug("Disconnected");
        Disconnect();
        connectionTries++
        if (connectionTries > 3) {
          connectionTries = 0;
          connector('random');
        } else {
          connector();
        }
    }

    function WsSend(data) {
        if (!ws) return;
        if (ws.readyState !== 1) return; // Still connecting
        if (data.build) ws.send(data.build());
        else ws.send(data);
    }

    function Play() {
        var name = $('#nick').val().trim();
        var clanName = $('#clan').val() ? '{'+$('#clan').val().trim().replace('{','').replace('}','')+'} ' : '';
        var customSkin = $('#customSkin').val() ? '['+$('#customSkin').val().trim()+'] ' : '';
        window.localStorage.setItem('clanName',$('#clan').val().trim());
        window.localStorage.setItem('customSkin',$('#customSkin').val().trim());
        if (!window.location.pathname.includes('chewy') && name.toLowerCase().replace(/\s/g, '').includes('chewy')) name = '[evil] Imposter';
        if (name.includes('*')) name = name.replace('*','');
        var thisName = customSkin + clanName + name;
        log.debug("Playing");
        var writer = new Writer(true);
        writer.setUint8(0x00);
        writer.setStringUTF8(thisName);
        userName = thisName;
        WsSend(writer);
        msend(2);
    }

    function SendChat(a) {
        if (a.length > 200) {
            chatMessages.push({
                server: false,
                admin: false,
                mod: false,
                nameColor: "#FF0000",
                name: "Cigar",
                message: "Too large message!",
                time: Date.now()
            });
            drawChat();
            return;
        }
        var writer = new Writer();
        writer.setUint8(0x63);
        writer.setUint8(0);
        writer.setStringUTF8(a);
        WsSend(writer);
    }

    function SendMouseMove(x, y) {
        var writer = new Writer(true);
        writer.setUint8(0x10);
        writer.setUint32(x);
        writer.setUint32(y);
        writer._b.push(0, 0, 0, 0);
        WsSend(writer);
    }

    // Game variables
    var nodesID = { },
        nodes = [],
        deadNodes = [],
        myNodes = [],
        qTree = null,
        leaderboard = [],
        leaderboardType = -1, // -1 - Not set, 48 - Text list, 49 - FFA list, 50 - Pie chart
        leaderboardCanvas = null,
        userScore = 0,
        centerX = 0,
        centerY = 0,
        _cX = 0, _cY = 0, _cZoom = 1, // Spectate packet X, Y & zoom
        mapCenterSet = false,
        rawMouseX = 0,
        rawMouseY = 0,
        border = BORDER_DEFAULT,
        loadedSkins = [],
        drawZoom = 1,  // Scale when drawing
        viewZoom = 1,  // Scale without scroll scaling
        mouseZoom = 1, // Scroll scale
        lastMessageTime = -1,
        latency = -1,
        drawing = false,
        userName = "",
        // Red Green Blue Yellow Cyan Magenta Orange
        teamColors = ["#FF3333", "#33FF33", "#3333FF", "#FFFF33", "#33FFFF", "#FF33FF", "#FF8833"],
        gameType = -1; // Given at SetBorder packet
        serverVersion = "Unknown", // Given at SetBorder packet
        chatText = "",
        chatMessages = [],
        chatAlphaWait = 0,
        chatCanvas = null,
        isTyping = false,
        isWindowFocused = true,
        mainCanvas = null,
        mainCtx = null,
        chatBox = null,
        lastDrawTime = Date.now(),
        escOverlay = false,
        fps = 0,
        serverStatID = null,
        serverStats = null,
        serverStatCanvas = null,
        _viewMult = 1,
        pressed = {
            space: false,
            w: false,
            e: false,
            r: false,
            t: false,
            p: false,
            q: false,
            esc: false
        };

    // Render quality settings
    var qualitySettings = {
        'default': {
            getTextLineWidth: function(a) {
                return (a * 0.05) + 3;
            },
            cellOutline: false,
            smoothRender: 0.1,
            overrideGrid: false,
            overrideSkins: false,
            drawStat: true,
            drawMassSpectate: true
        },
    };

    // Client variables
    var settings = {
        mobile: 'createTouch' in document,
        showMass: true,
        showNames: true,
        showLeaderboard: true,
        showChat: true,
        showGrid: false,
        showTextOutline: false,
        clippedNames: false,
        bigNames: true,
        showColor: true,
        showSkins: true,
        darkTheme: true,
        transparentCells: false,
        monoZoom: false,
        transparency: 0.8,
        detailedVirus: false,
        autoRespawn: false,
        fastRenderMax: Infinity,
        spinnerMode: false,
        quality: 'default',
        qualityRef: qualitySettings['default'],
        allowGETipSet: false // Whether index.html?ip=abc is accepted (not implemented)
    };

    // Touches
    var touchStartX = 0,
        touchStartY = 0,
        touchMove = false;

    // Load local storage
    if (null != wHandle.localStorage) {
        wjQuery(window).load(function() {
            wjQuery(".save").each(function() {
                var id = $(this).data("box-id");
                var value = wHandle.localStorage.getItem("checkbox-" + id);
                if (value && value == "true" && 0 != id) {
                    $(this).prop("checked", "true");
                    $(this).trigger("change");
                } else if (id == 0 && value != null) {
                    $(this).val(value);
                }
            });
            wjQuery(".save").change(function() {
                var id = $(this).data('box-id');
                var value = (id == 0) ? $(this).val() : $(this).prop('checked');
                wHandle.localStorage.setItem("checkbox-" + id, value);
            });
        });
    }

    $.get('/api/skins', function(data) {
      var array = JSON.parse(data);
      knownSkins = array;
      setTimeout(function(){ui.updateSkin();},3000);
    });

    function hideESCOverlay() {
      if (!$('.modal.in').length > 0) {
        escOverlay = false;
        wjQuery("#overlays").fadeOut(50);
      }
    }

    function showESCOverlay(arg) {
        escOverlay = true;
        userNickName = null;
        wjQuery("#overlays").fadeIn(50);
    }

    function loadInit() {
        mainCanvas = document.getElementById('canvas');
        mainCtx = mainCanvas.getContext('2d');
        chatBox = document.getElementById("chat_textbox");
        mainCanvas.focus();

        // Wheel handling
        function handleWheel(event) {
          if (!$('.modal.in').length > 0 && !$('#overlays').is(':visible')) {
            mouseZoom *= Math.pow(.9, event.wheelDelta / -120 || event.detail || 0);
            mouseZoom * 1 > mouseZoom && (mouseZoom = 1);
            mouseZoom > 4 / viewZoom && (mouseZoom = 4 / viewZoom);
          }
        }

        // Mouse wheel
        if (/firefox/i.test(navigator.userAgent))
            document.addEventListener("DOMMouseScroll", handleWheel, false);
        else
            document.body.onmousewheel = handleWheel;

        window.onfocus = function() {
            isWindowFocused = true;
        };

        window.onblur = function() {
            isWindowFocused = false;
        };

        wHandle.onkeydown = function(event) {
            switch (event.keyCode) {
                case 13: // enter
                    if (escOverlay) break;
                    if (!settings.showChat) break;
                    if (isTyping) {
                        chatBox.blur();
                        var chattxt = chatBox.value;
                        if (chattxt.length > 0) {
                          SendChat(chattxt);
                          msend(11,false,chattxt);
                        }
                        chatBox.value = "";
                    } else chatBox.focus();
                    break;
                case 32: // space
                    if (isTyping || escOverlay || pressed.space) break;
                    WsSend(UINT8_CACHE[17]);
                    pressed.space = true;
                    break;
                case 87: // W
                    if (isTyping || escOverlay || pressed.w) break;
                    WsSend(UINT8_CACHE[21]);
                    pressed.w = true;
                    break;
                case 81: // Q
                    if (isTyping || escOverlay || pressed.q) break;
                    WsSend(UINT8_CACHE[18]);
                    pressed.q = true;
                    break;
                case 69: // E
                    if (isTyping || escOverlay || pressed.e) break;
                    WsSend(UINT8_CACHE[22]);
                    pressed.e = true;
                    break;
                case 82: // R
                    if (isTyping || escOverlay || pressed.r) break;
                    WsSend(UINT8_CACHE[23]);
                    pressed.r = true;
                    break;
                case 84: // T
                    if (isTyping || escOverlay || pressed.t) break;
                    WsSend(UINT8_CACHE[24]);
                    pressed.t = true;
                    break;
                case 80: // P
                    if (isTyping || escOverlay || pressed.p) break;
                    WsSend(UINT8_CACHE[25]);
                    pressed.p = true;
                    break;
                case 27: // esc
                    if (pressed.esc) break;
                    pressed.esc = true;
                    if (escOverlay) hideESCOverlay();
                    else showESCOverlay();
                    break;
            }
        };

        wHandle.onkeyup = function(event) {
            switch (event.keyCode) {
                case 32: // space
                    pressed.space = false;
                    break;
                case 87: // W
                    pressed.w = false;
                    break;
                case 81: // Q
                    if (pressed.q) WsSend(UINT8_CACHE[19]);
                    pressed.q = false;
                    break;
                case 69: // E
                    pressed.e = false;
                    break;
                case 82: // R
                    pressed.r = false;
                    break;
                case 84: // T
                    pressed.t = false;
                    break;
                case 80: // P
                    pressed.p = false;
                    break;
                case 27:
                    pressed.esc = false;
                    break;
            }
        };

        chatBox.onblur = function() {
            isTyping = false;
            drawChat();
        };

        chatBox.onfocus = function() {
            isTyping = true;
            drawChat();
        };

        mainCanvas.onmousemove = function(event) {
            rawMouseX = event.clientX;
            rawMouseY = event.clientY;
        };

        setInterval(function() {
            // Mouse update
            SendMouseMove((rawMouseX - mainCanvas.width / 2) / drawZoom + centerX,
                (rawMouseY - mainCanvas.height / 2) / drawZoom + centerY);
        }, 40);

        wHandle.onresize = function() {
            var cW = mainCanvas.width = wHandle.innerWidth,
                cH = mainCanvas.height = wHandle.innerHeight;
            _viewMult = Math.min(cH / 1080, cW / 1920);
        };

        wHandle.onresize();

        log.info("Loaded, took " + (Date.now() - LOAD_START) + " ms");

        if (window.requestAnimationFrame)
            window.requestAnimationFrame(drawLoop);
        else
            setInterval(drawGame, 1E3 / FPS_MAXIMUM);
        showESCOverlay();
    }

    function getChatAlpha() {
        if (isTyping) return 1;
        var now = Date.now(),
            lastMsg = chatMessages.peek(),
            diff = now - lastMsg.time;

        return 1 - Math.min(Math.max((diff - chatAlphaWait) * .001, 0), 1);
    }

    function drawTouch() {
        if (touchMove) {
            mainCtx.save();
            mainCtx.beginPath();
            mainCtx.arc(touchStartX, touchStartY, 10, 0, PI_2, false)
        }
    }

    function drawChat() {
        if (!settings.showChat || chatMessages.length === 0) {
            chatCanvas = null;
            return;
        }

        if (!chatCanvas) chatCanvas = document.createElement('canvas');

        var ctx = chatCanvas.getContext('2d'),
            l,
            now = Date.now(),
            i = 0, msg,
            lastMsg = chatMessages.peek(),
            fW, aW = 0,
            alpha = getChatAlpha();

        if (alpha === 0) {
            chatCanvas = null;
            chatAlphaWait = 0;
            return;
        }

        while ((l = chatMessages.length) > 15) chatMessages.shift(); // Remove older messages

        for ( ; i < l; i++) {
            msg = chatMessages[i];
            ctx.font = '18px Montserrat';
            aW = Math.max(aW, 20 + ctx.measureText(msg.name + ":").width + ctx.measureText(" " + msg.message).width);
        }

        chatCanvas.width = aW;
        chatCanvas.height = l * 20 + 20;
        ctx.fillStyle = "#000000";
        ctx.globalAlpha = alpha * .2;
        ctx.fillRect(0, 0, chatCanvas.width, chatCanvas.height);

        ctx.globalAlpha = alpha;
        for (i = 0; i < l; i++) {
            msg = chatMessages[i];

            // Name
            ctx.fillStyle = msg.nameColor;
            ctx.font = '18px Montserrat';
            fW = ctx.measureText(msg.name + ":").width;
            ctx.font = '18px Montserrat';
            ctx.fillText(msg.name + ":", 10, 5 + 20 * (i + 1));

            // Message
            ctx.font = '18px Montserrat';
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(" " + msg.message, 10 + fW, 5 + 20 * (i + 1));
        }
    }

    function drawServerStat() {
        if (!serverStats) {
            serverStatCanvas = null;
            return;
        }

        if (!serverStatCanvas) serverStatCanvas = document.createElement('canvas');
        var ctx = serverStatCanvas.getContext('2d'), a, b, c;

        ctx.font = '14px Montserrat';
        serverStatCanvas.width = 4 + Math.max(
            ctx.measureText(serverStats.name).width,
            ctx.measureText(serverStats.mode).width,
            ctx.measureText((a = serverStats.playersTotal + " / " + serverStats.playersLimit + " players")).width,
            ctx.measureText((b = serverStats.playersAlive + " playing")).width,
            ctx.measureText((c = serverStats.playersSpect + " spectating")).width
        );
        serverStatCanvas.height = 85;
        if (settings.darkTheme) {
          $('#serverstatus').attr('style', 'color: #FFFFFF;');
        } else {
          $('#serverstatus').attr('style', 'color: #111111;');
        }
        console.log(serverStats)
        if ($('#gamemode option:selected').attr('mode')=='minions') {
          $('#statsPlayers').html(Math.round(serverStats.playersTotal/4) + " / " + serverStats.playersLimit);
          $('#statsPlaying').html((Math.round(serverStats.playersTotal/4)) - serverStats.playersSpect);
          $('#statsSpec').html(serverStats.playersSpect);
        } else {
          $('#statsPlayers').html(serverStats.playersTotal + " / " + serverStats.playersLimit);
          $('#statsPlaying').html(serverStats.playersTotal - serverStats.playersSpect);
          $('#statsSpec').html(serverStats.playersSpect);
          $('#statsLoad').html(Math.round(serverStats.update)+'%');
          $('#statsUptime').html(serverStats.uptime);
        }

        ctx.font = '14px Montserrat';
        ctx.fillStyle = settings.darkTheme ? "#AAAAAA" : "#000000";
        ctx.globalAlpha = 1;
        ctx.fillText(serverStats.name, 2, 16);
        ctx.fillText(serverStats.mode, 2, 32);
        ctx.fillText(a, 2, 48);
        ctx.fillText(b, 2, 64);
        ctx.fillText(c, 2, 80);
    }

    function drawLeaderboard() {
        if (leaderboardType === -1) return;

        if (leaderboard.length === 0) {
            leaderboardCanvas = null;
            return;
        }
        if (!leaderboardCanvas) leaderboardCanvas = document.createElement('canvas');

        var ctx = leaderboardCanvas.getContext('2d'),
            l = leaderboard.length;
            width = leaderboardType !== 50 ? 60 + 24 * l : 240,
            i = 0;

        leaderboardCanvas.width = 300;
        leaderboardCanvas.height = width;

        ctx.globalAlpha = .4;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 300, width);

        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Montserrat";
        ctx.fillText("Leaderboard", 150 - ctx.measureText("Leaderboard").width / 2, 40);

        if (leaderboardType === 0x32) {
            // Pie chart
            ctx.beginPath();
            var last = 0;
            for ( ; i < l; i++) {
                ctx.fillStyle = teamColors[i];
                ctx.moveTo(100, 140);
                ctx.arc(100, 140, 80, last, (last += leaderboard[i] * PI_2), false);
                ctx.fill();
            }
            ctx.closePath();
        } else {
            // Text-based
            var o, me = false, w, start;
            ctx.font = "20px Montserrat";
            for ( ; i < l; i++) {
                o = leaderboard[i];
                if (leaderboardType === 0x31) {
                    me = o.me;
                    o = o.name;
                }
                var reg = /\[([^]+)\]/.exec(leaderboard[0].name);
                if (reg && reg.length === 2) {
                  if ($.inArray(reg[1],knownSkins) === -1) leaderboard[0].name = leaderboard[0].name.replace(reg[0], "").trim();
                }
 
                if (leaderboard[0].name != firstPlace) {
                  firstPlace = leaderboard[0].name;
                  sfx('leaderboard');
                  ui.alert(leaderboard[0].name+' is now in 1st place!');
                  var reg = /\{([^]+)\}/.exec(leaderboard[0].name);
                  if (reg && reg.length === 2) {
                    if (reg[1] != firstPlaceClan) {
                      firstPlaceClan = reg[1];
                      var setColor = pastClans[reg[1]];
                      ui.alert('The clan <span style="color: '+setColor+'">'+reg[1]+'</span> is now in the lead!',true);
                      sfx('explosion'); 
                    }
                  }
                }

                // Replace {skin} with empty string
                var reg = /\[([^]+)\]/.exec(o);
                if (reg && reg.length === 2) {
                  if ($.inArray(reg[1],knownSkins) === -1) o = o.replace(reg[0], "").trim();
                }

                (leaderboardType === 0x31) && (o = o || "An unnamed cell");
                
                ctx.fillStyle="#FFFFFF";
                if (me) { ctx.fillStyle="#FFAAAA"; }
                if (o[0] == '*') { 
                  var a = settings.darkTheme ? '#a5a5a5' : '#dddddd';
                  ctx.fillStyle = a; 
                }
                if (connected.name.toLowerCase() == 'clanwars') {
                  var reg = /\{([^]+)\}/.exec(o);
                  if (reg && reg.length === 2) {
                    if (!pastClans[reg[1]]) {
                      pastClans[reg[1]] = plz();
                    } else {
                      ctx.fillStyle = pastClans[reg[1]];
                    }
                  }
                } else {
                  var reg = /\{([^]+)\}/.exec(o);
                  if (reg && reg.length === 2) {
                    if ($('#clan').val() == reg[1] && !me) {
                      ctx.fillStyle = color.yellow;
                    }
                  }
                }
                
                o = (i + 1) + ". " + o;
                var start = ((w = ctx.measureText(o).width) > 300) ? 2 :  150 - w * 0.5;
                ctx.fillText(o, start, 70 + 24 * i);
            }
        }
    }

    function drawGrid() {
        mainCtx.save();
        mainCtx.strokeStyle = settings.darkTheme ? "#AAAAAA" : "#000000";
        mainCtx.globalAlpha = .2;
        var step = 50
            cW = mainCanvas.width / drawZoom, cH = mainCanvas.height / drawZoom,
            startLeft = (-centerX + cW * .5) % step,
            startTop = (-centerY + cH * .5) % step,
            i = startLeft;

        mainCtx.scale(drawZoom, drawZoom);

        // Left -> Right
        for ( ; i < cW; i += step) {
            mainCtx.moveTo(i, -.5);
            mainCtx.lineTo(i, cH);
        }

        // Top -> Bottom
        for (i = startTop; i < cH; i += step) {
            mainCtx.moveTo(-.5, i);
            mainCtx.lineTo(cW, i);
        }
        mainCtx.stroke();
        mainCtx.restore();
    }

    function drawLoop() {
        drawGame(true);
        window.requestAnimationFrame(drawLoop);
    }

    function drawGame() {
        var dr = Date.now(), passed;
        fps += (1000 / (passed = dr - lastDrawTime) - fps) * .1;
        lastDrawTime = dr;
        isNaN(fps) && (fps = 0);

        var cW = mainCanvas.width = wHandle.innerWidth,
            cH = mainCanvas.height = wHandle.innerHeight,
            cW2 = cW / 2,
            cH2 = cH / 2,
            newDrawZoom = 0,
            viewMult = viewMultiplier(),
            i, l;


        var nodesCopy = nodes.concat(deadNodes);

        drawing = true;

        // Background
        mainCtx.save();
        mainCtx.fillStyle = settings.darkTheme ? "#111111" : "#F2FBFF";
        mainCtx.fillRect(0, 0, cW, cH);
        mainCtx.restore();

        var tx, ty, z1;

        // Grid
        if (settings.showGrid && !settings.qualityRef.overrideGrid) drawGrid();

        // Update size & position & view update
        l = nodesCopy.length;
        for (i = 0; i < l; i++) {
            n = nodesCopy[i];
            dt = Math.max(Math.min((dr - n.appStamp) / 120, 1), 0)
            n.updateAppearance(dr, dt);
        }
        viewUpdate();

        // Scale & translate for cell drawing
        mainCtx.translate((tx = cW2 - centerX * drawZoom), (ty = cH2 - centerY * drawZoom));
        mainCtx.scale(drawZoom, drawZoom);

        nodesCopy.sort(nodeSort);

        // Draw cells
        l = nodesCopy.length;
        for (i = 0; i < l; i++) {
            n = nodesCopy[i];
            n.draw(dr);
        }

        // Return back to normal
        mainCtx.scale((z1 = 1 / drawZoom), z1);
        mainCtx.translate(-tx, -ty);

        // Scale with viewMult for readability
        mainCtx.scale(viewMult, viewMult);

        // Score & FPS drawing
        $('#statsFPS').html(~~fps);
        $('#statsPing').html(latency+' ms');
        $('#statsScore').html(userScore);
        leaderboardCanvas && mainCtx.drawImage(leaderboardCanvas, cW / viewMult - leaderboardCanvas.width - 20, 20);

        // Chat alpha update
        if (chatMessages.length > 0) if (getChatAlpha() !== 1) drawChat();
        chatCanvas && mainCtx.drawImage(chatCanvas, 10, (cH - 50) / viewMult - chatCanvas.height);

        // Scale back to normal
        mainCtx.scale(viewMult = 1 / viewMult, viewMult);

        // Draw touches
        drawTouch();

        drawing = false;

        garbageCollection();
    }

    function viewUpdate() {
        // Zoom, position & score update
        var l = myNodes.length,
            newDrawZoom,
            viewMult = viewMultiplier(),
            newScore = 0;

        if (l > 0) {
            var ncX = 0,
                ncY = 0;
            var rl = 0;
            viewZoom = 0;
            for (i = 0; i < l; i++) {
                n = nodesID[myNodes[i]];
                if (!n) continue;
                if (settings.monoZoom) { viewZoom = 1000;
                } else { viewZoom += n.size; }
                newScore += ~~(n.nSize * n.nSize * .01);
                ncX += n.x;
                ncY += n.y;
                rl++;
            }
            //console.log(rl, ncX, ncY);
            if (rl > 0) {
                userScore = Math.max(newScore, userScore);
                ncX /= rl;
                ncY /= rl;
                centerX += (~~ncX - centerX) * .4;
                centerY += (~~ncY - centerY) * .4;
                viewZoom = Math.pow(Math.min(64 / viewZoom, 1), .4);
                newDrawZoom = viewZoom;
            } else {
                // Cells haven't been added yet
                viewZoom = 1;
                newDrawZoom = 1;
            }
        } else {
            centerX += (_cX - centerX) * .02;
            centerY += (_cY - centerY) * .02;
            newDrawZoom = _cZoom;
        }
        drawZoom += (newDrawZoom * viewMult * mouseZoom - drawZoom) * .11;
    }

    function nodeSort(a, b) {
        return a.size === b.size ? a.id - b.id : a.size - b.size;
    }

    function viewMultiplier() {
        return _viewMult;
    }

    function Cell(id, x, y, size, name, color, skin, time, flags) {
        this.id = id;
        this.x = this.nx = x;
        this.y = this.ny = y;
        this.size = this.nSize = size;
        this.setName(name);
        this.setColor(color);
        this.skin = skin;
        if (flags) {
            this.isEjected = !!(flags & 0x20);
            this.isVirus = !!(flags & 0x01);
            this.isAgitated = !!(flags & 0x10);
            (this.isEjected || this.isVirus || this.isAgitated) && (this.notPellet = true);
        }
        this.birthStamp = this.updateStamp = time;
    }

    Cell.prototype = {
        destroyed: false,
        id: 0,
        x: 0,
        y: 0,
        size: 0,
        name: 0,
        color: "#FFFFFF",
        nameSkin: "",
        skin: "",
        updateStamp: -1,
        birthStamp: -1,
        deathStamp: -1,
        appStamp: -1,
        nx: 0,
        ny: 0,
        nSize: 0,
        killer: null,
        rigidPoints: [],
        isEjected: false,
        isPellet: false,
        notPellet: false,
        isVirus: false,
        isAgitated: false,
        strokeColor: "#AAAAAA",
        _nameSize: 0,
        _meCache: null, // If it's a pellet it'll draw from this cache
        _meW: null,
        _meH: null,
        updateAppearance: function(time, dt) {
            if (this.destroyed)
                if (time - this.deathStamp > 200 || !this.killer || this.size < 4) {
                    // Fully remove
                    var i;
                    ((i = deadNodes.indexOf(this)) > -1) && deadNodes.splice(i, 1);
                }
            if (this.killer) {
                this.nx = this.killer.x;
                this.ny = this.killer.y;
                this.nSize = 0;
            }
            this.x += (this.nx - this.x) * dt;
            this.y += (this.ny - this.y) * dt;
            this.size += (this.nSize - this.size) * dt;
            this._nameSize = ~~(Math.max(~~(.3 * this.nSize), 24) / 4) * 4;
        },
        setName: function(name) {
            var reg = /\[([^]+)\]/.exec(name);
            if (reg) if (reg.length === 2) {
                this.nameSkin = reg[1];
                if (settings.showSkins) { this.name = name.replace(reg[0], "").trim(); } else { this.name = name; }
                return;
            }
            this.name = name;
        },
        setSkin: function(skin) {
            this.skin = skin[0] === "%" ? skin.replace("%", "") : skin;
        },
        setColor: function(color) {
            this.color = color;
            var r = (~~(parseInt(color.substr(1, 2), 16) * 0.9)).toString(16),
                g = (~~(parseInt(color.substr(3, 2), 16) * 0.9)).toString(16),
                b = (~~(parseInt(color.substr(5, 2), 16) * 0.9)).toString(16);
            if (r.length == 1) r = "0" + r;
            if (g.length == 1) g = "0" + g;
            if (b.length == 1) b = "0" + b;
            this.strokeColor = "#" + r + g + b;
        },
        destroy: function(time) {
            delete nodesID[this.id];
            var i;
            ((i = nodes.indexOf(this)) !== -1) && nodes.splice(i, 1);
            ((i = myNodes.indexOf(this.id)) !== -1) && myNodes.splice(i, 1);
            if (i > -1 && myNodes.length === 0) {
                _cX = centerX;
                _cY = centerY;
                _cZoom = viewZoom;
                userScore = 0;
                hiscore = 0;
                streaks = [];
                if (!settings.autoRespawn) {
                  showESCOverlay();
                }
                msend(1);
                if (settings.autoRespawn) {
                  Play(userName);
                }
            }
            deadNodes.push(this);
            this.deathStamp = time;
            this.destroyed = true;
        },
        updatePoints: function(animated, jagged, dt) {
            // Update points
            var pointAmount = this.size,
                minPointAmount = jagged ? 90 : (this.isPellet ? 5 : 16),
                x = this.x,
                y = this.y,
                maxSizeRemove = this.size * .16,
                i = 0, sz, step, pt, px, py, temp, diff, nDiff;

            !this.isVirus && (pointAmount *= drawZoom);
            this.isEjected && (pointAmount *= .5);
            pointAmount = Math.max(~~pointAmount, minPointAmount);
            jagged && (pointAmount = ~~(pointAmount * .5) * 2);

            step = PI_2 / pointAmount;
            var newPoints = [];
            for ( ; i < pointAmount; i++) {
                var nDiff;
                if (this.rigidPoints[i] && animated) {
                    // Animate the point
                    pt = this.rigidPoints[i];
                    nDiff = pt.newDiff;
                    diff = pt.diff + (nDiff - pt.diff) * dt;
                    if (toleranceCompare(diff, nDiff, .05)) nDiff = getNextDiff(jagged, i, pointAmount, animated);
                } else if (animated) {
                    // New point
                    nDiff = getNextDiff(jagged, i, pointAmount, animated);
                    diff = 0;
                } else {
                    // Non-animated point
                    diff = nDiff = getNextDiff(jagged, i, pointAmount, animated);
                }
                sz = this.size + diff;

                // Calculate position
                var sin = Math.sin(i * step), cos = Math.cos(i * step);
                px = x + sin * sz;
                py = y + cos * sz;

                var cx = 0, cy = 0;
                // Point collision check (doesn't work)
                /*if (qTree) {
                    var id = this.id,
                        dx, dy;
                    qTree.retrieve2(cx, cy, 1, 1, function(a) {
                        if (a.refID !== id && 25 > (cx - a.x) * (cx - a.x) + (cy - a.y) * (cy - a.y)) {
                            console.log('collision')
                        }
                    });
                }*/
                px += cx;
                py += cy;

                // Border check
                if (px < border.left) cx -= sin * Math.min(border.left - px, maxSizeRemove);
                if (px > border.right) cx -= sin * Math.min(px - border.right, maxSizeRemove);
                if (py < border.top) cy -= cos * Math.min(border.top - py, maxSizeRemove);
                if (py > border.bottom) cy -= cos * Math.min(py - border.bottom, maxSizeRemove);
                px += cx;
                py += cy;

                newPoints.push({
                    refID: this.id,
                    size: sz,
                    diff: diff,
                    newDiff: nDiff,
                    x: px,
                    y: py
                });
            }

            this.rigidPoints = newPoints;
        },
        draw: function(time) {
            var dt = Math.min(Math.max((time - this.appStamp) / 120, 0), 1);
            this.appStamp = time;
            mainCtx.save();
            this.drawShape(dt);

            // Text drawing
            if (this.notPellet && !this.isEjected) {
                mainCtx.globalAlpha = 1;
                var nameDraw = settings.showNames && this.name !== "" && !this.isVirus && this.size >= 100;
                var nameMultiplier = settings.bigNames ? 1 : 2;
                if (nameDraw) drawText(this.x, this.y, this.name, this._nameSize * nameMultiplier, false);

                if (settings.showMass && (myNodes.indexOf(this.id) !== -1 ||
                    (settings.qualityRef.drawMassSpectate)) && this.size >= 100) {

                    var text = Math.ceil(this.size * this.size * .01).toString();
                    if (nameDraw)
                        drawText(this.x, this.y + Math.max(this.size * .22, this._nameSize * 1.5), text, this._nameSize, true);
                    else
                        if (!this.isVirus && (!settings.detailedVirus || !settings.showTextOutline))
                          drawText(this.x, this.y, text, this._nameSize * nameMultiplier, true);
                }
            }
            mainCtx.restore();
        },
        drawShape: function(dt) {
            var complex = this.wasComplexDrawing = settings.fastRenderMax <= drawZoom,
                jagged = this.isVirus; if (!settings.detailedVirus) { jagged = false; }

            mainCtx.lineWidth = settings.qualityRef.cellOutline ? (this.isEjected ? 0 : this.size > 20 ? Math.max(this.size * .01, 10) : 0) : 0;
            mainCtx.lineCap = "round";
            mainCtx.lineJoin = "round";
            mainCtx.fillStyle = settings.spinnerMode && !this.isPellet && !this.isEjected && !this.isVirus ? (settings.darkTheme ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)') : this.color;
            mainCtx.strokeStyle = settings.spinnerMode && !this.isPellet && !this.isEjected && !this.isVirus ? 'rgba(0,0,0,0)' : this.color;
            if (settings.transparentCells) {
              mainCtx.globalAlpha = settings.transparency;
            }
            if (!settings.detailedVirus && this.isVirus) {
              mainCtx.globalAlpha = "0.6";
              mainCtx.fillStyle = "#b2b2b2";
              mainCtx.strokeStyle = "#FFFFFF";
            }
            if (!settings.showColor) {
              if (this.isEjected) {
                mainCtx.globalAlpha = "1";
                mainCtx.fillStyle = "#b2b2b2";
                mainCtx.strokeStyle = "#FFFFFF";
              } else if (!this.isVirus && !this.isEjected) {
                mainCtx.fillStyle = "#b2b2b2";
                mainCtx.strokeStyle = "#FFFFFF";
              }
            }
            if (connected.name.toLowerCase() == 'clanwars') {
              var reg = /\{([^]+)\}/.exec(this.name);
              if (reg && reg.length === 2) {
                if (!pastClans[reg[1]]) {
                  pastClans[reg[1]] = plz();
                } else {
                  mainCtx.fillStyle = pastClans[reg[1]];
                  mainCtx.strokeStyle = pastClans[reg[1]];
                  mainCtx.lineWidth = this.size * 0.2;
                }
              }
            }
            if (complex || jagged || this.isAgitated) {
                mainCtx.beginPath();
                this.updatePoints(complex, jagged, dt);
                var points = this.rigidPoints;

                mainCtx.moveTo(
                    points[0].x,
                    points[0].y
                );

                for (var i = 1, l = points.length; i < l; i++) {
                    mainCtx.lineTo(
                        points[i].x,
                        points[i].y
                    );
                }

                mainCtx.lineTo(
                    points[0].x,
                    points[0].y
                );
                mainCtx.fill();
                mainCtx.stroke();
                this.drawSkin();
                mainCtx.closePath();
            } else {
                this.rigidPoints = [];
                if (this._meCache)
                    // Cached drawing exists - use it
                    mainCtx.drawImage(this._meCache, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                else {
                    mainCtx.beginPath();
                    mainCtx.arc(this.x, this.y, this.size - mainCtx.lineWidth * .5 + .5, 0, PI_2, false);
                    mainCtx.fill();
                    settings.qualityRef.cellOutline && mainCtx.stroke();
                    this.drawSkin();
                    mainCtx.closePath();
                }
            }
        },
        drawSkin: function() {
            if (settings.qualityRef.overrideSkins) return;
            var skin = this.skin || this.nameSkin || this.name.toLowerCase();
            if ($.inArray(skin,knownSkins) === -1 && !isurl(skin)) { skin = ''; }
            
            if (settings.spinnerMode) {
              // Download fidget spinner
              loadedSkins[skin] = new Image;
              loadedSkins[skin].src = 'http://spinz.io/asset/image/entity/player/player-t6-base.svg';
            }

            if (settings.showSkins && skin != '') {
              var thisSkin = isurl(skin) ? skin : SKIN_URL + skin.toLowerCase() + '.png';
                if (!loadedSkins.hasOwnProperty(skin)) {
                    // Download skin
                    loadedSkins[skin] = new Image; 
                    loadedSkins[skin].src = thisSkin;
                }
                // Set skin to draw
                if (0 != loadedSkins[skin].width && loadedSkins[skin].complete) {
                    loadedSkins[skin].accessTime = Date.now();
                    if (!settings.clippedNames) { mainCtx.save(); }
                    mainCtx.clip();
                    mainCtx.drawImage(loadedSkins[skin], this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size);
                    if (!settings.clippedNames) { mainCtx.restore(); }
                }
            }
        }
    };

    function toleranceCompare(a, b, t) {
        var d = a - b;
        (d < 0) && (d = -d);
        return d <= t;
    }

    function getNextDiff(jagged, index, pointAmount, animated) {
        if (animated) {
            var maxDiff = jagged ? 3 : 1.7 * .6;
            if (jagged) return (index % 2 === 1 ? -maxDiff : maxDiff) + Math.random() - 1.5;
            return (Math.random() - .5) * maxDiff * 2;
        }
        if (jagged) return index % 2 === 1 ? -3 : 3;
        return 0;
    }

    var textCache = { },
        massCache = { };

    function garbageCollection() {
        var now = Date.now();

        for (var i in textCache) {
            for (var j in textCache[i]) {
                if (now - textCache[i][j].accessTime > 3000) {
                    // Text unused for 3 seconds, delete it to restore memory
                    delete textCache[i][j];
                    if (Object.keys(textCache[i]).length === 0) delete textCache[i]; // Full removal
                }
            }
        }
        for (i in massCache) {
            if (now - massCache[i].accessTime > 3000) {
                // Mass numbers unused for 3 seconds, delete it to restore memory
                delete massCache[i];
            }
        }

        for (var i in loadedSkins) {
            if (now - loadedSkins[i].accessTime > 60000) {
                // Loaded skin image unused for 60 seconds, delete it to restore memory
                delete loadedSkins[i];
            }
        }
    }

    function newTextCache(value, size) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            lineWidth = settings.showTextOutline ? settings.qualityRef.getTextLineWidth(size) : 0;

        // Why set font twice???
        ctx.font = size + 'px Montserrat';
        canvas.width = ctx.measureText(value).width;
        canvas.height = size * 1.2;
        ctx.font = size + 'px Montserrat';
        ctx.fillStyle = lineWidth === 0 && !settings.showColor ? "#FFFFFF" : "#FFFFFF";
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#000000";

        (lineWidth > 0) && ctx.strokeText(value, 0, size);
        ctx.fillText(value, 0, size);

        (!textCache[value]) && (textCache[value] = { });
        textCache[value][size] = {
            canvas: canvas,
            accessTime: Date.now()
        };
        return canvas;
    }

    function newMassCache(size) {
        var temp;
        var canvasList = [
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 0
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 1
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 2
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 3
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 4
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 5
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 6
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 7
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 8
                { c: (temp = document.createElement('canvas')), t: temp.getContext('2d'), w: NaN }, // 9
            ],
            i = 0,
            lineWidth = settings.showTextOutline ? settings.qualityRef.getTextLineWidth(size) : 0,
            ctx, canvas, height = size + lineWidth * 5 + 2;

        for ( ; i < 10; i++) {
            canvas = canvasList[i].c;
            ctx = canvasList[i].t;
            ctx.font = size + 'px Montserrat';
            canvasList[i].w = (canvas.width = ctx.measureText(i).width + lineWidth * 3) - lineWidth * 3;
            canvas.height = height;
            ctx.font = size + 'px Montserrat';
            ctx.fillStyle = lineWidth === 0 && !settings.showColor ? "#FFFFFF" : "#FFFFFF";
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = "#000000";

            (lineWidth > 0) && ctx.strokeText(i, lineWidth, size);
            ctx.fillText(i, lineWidth, size);
        }

        massCache[size] = {
            canvasList: canvasList,
            height: height,
            accessTime: Date.now()
        };

        return massCache[size];
    }

    function findTextMatch(value, size) {
        if (!textCache[value]) return newTextCache(value, size); // No text with equal string

        var tolerance = ~~(size * .1),
            b;

        if ((b = textCache[value][size])) {
            b.accessTime = Date.now();
            return b.canvas;
        }
        var i = 1, j, l;

        // Search with identical sized text
        for ( ; i < tolerance; i++) {
            // Larger than requested text sizes are better if no match is found
            if ((b = textCache[value][size + i])) {
                b.accessTime = Date.now();
                return b.canvas;
            }
            // In any case check for smaller size too
            if ((b = textCache[value][size - i])) {
                b.accessTime = Date.now();
                return b.canvas;
            }
        }

        // No match
        return newTextCache(value, size);
    }

    function findMassMatch(size) {
        if (massCache[size]) {
            massCache[size].accessTime = Date.now();
            return massCache[size];
        }

        var b, tolerance = ~~(size * .1), i = 0;

        // Identical search way as with text
        for ( ; i < tolerance; i++) {
            // Smaller than requested mass sizes are favored now
            if ((b = massCache[size - i])) {
                b.accessTime = Date.now();
                return b;
            }
            if ((b = massCache[size + i])) {
                b.accessTime = Date.now();
                return b;
            }
        }

        // No match
        return newMassCache(size);
    }

    function drawText(x, y, value, size, isMass) {
        if (size > 5000) return; // Integrity check

        var identical;
        if (isMass) {
            identical = findMassMatch(size);
            var str = value.toString(),
                maxW = 0, nowW = 0,
                i = 0,
                currentNumber;
            y -= identical.height * .5;

            // Measure half-width
            for ( ; i < str.length; i++)
                maxW += identical.canvasList[parseInt(str[i])].w;
            x -= maxW * .5;

            // Draw char by char
            for (i = 0; i < str.length; i++) {
                currentNumber = identical.canvasList[parseInt(str[i])];
                mainCtx.drawImage(currentNumber.c, x, y);
                x += currentNumber.w;
            }
        } else {
            identical = findTextMatch(value, size),
                w = identical.width,
                h = identical.height;

            mainCtx.drawImage(identical, x - w * .5, y - h * .5, w, h);
        }
    }

    function buildQTree() {
        if (.4 > drawZoom) qTree = null;
        else {
            var a = Number.POSITIVE_INFINITY,
                b = Number.POSITIVE_INFINITY,
                c = Number.NEGATIVE_INFINITY,
                d = Number.NEGATIVE_INFINITY,
                e = 0,
                f = nodes.length,
                added = [];

            for (var i = 0; i < f; i++) {
                var node = nodes[i];
                if (!node) continue;
                if (node.rigidPoints.length > 0) {
                    e = Math.max(node.size, e);
                    a = Math.min(node.x, a);
                    b = Math.min(node.y, b);
                    c = Math.max(node.x, c);
                    d = Math.max(node.y, d);
                    added.push(node);
                }
            }

            qTree = Quad.init({
                minX: a - (e + 100),
                minY: b - (e + 100),
                maxX: c + (e + 100),
                maxY: d + (e + 100),
                maxChildren: 64,
                maxDepth: 4
            });

            f = added.length;
            for (i = 0; i < c; i++) {
                node = added[i];
                if (!node) continue;
                b = node.rigidPoints.length;
                for (a = 0; a < b; ++a) qTree.insert(node.rigidPoints[a]);
            }
        }
    }

    wHandle.setserver = function(arg) {
        NProgress.start();
        Disconnect();
        Connect(CONNECT_TO = arg);
        $('#statsPing').html('0');
        $('#statsScore').html('0');
        $('#statsPlayers').html('0');
        $('#statsPlaying').html('0');
        $('#statsSpec').html('0');
    };
    wHandle.leaveserver = function() {
        Disconnect();
        $('#statsPing').html('0');
        $('#statsScore').html('0');
        $('#statsPlayers').html('0');
        $('#statsPlaying').html('0');
        $('#statsSpec').html('0');
    };
    wHandle.pushChat = function(a,b,c) {
        addChat(a,b,c);
    };
    wHandle.setDarkTheme = function(a) {
        settings.darkTheme = a;
        drawServerStat();
    };
    wHandle.setShowMass = function(a) {
        settings.showMass = a;
    };
    wHandle.setSkins = function(a) {
        settings.showSkins = a;
        textCache = { };
        massCache = { };
    };
    wHandle.setColors = function(a) {
        settings.showColor = !a;
        if (settings.qualityRef.getTextLineWidth(100) === 0) {
            // Reset caches since if setColors is false all text is black
            textCache = { };
            massCache = { };
        }
    };
    wHandle.setNames = function(a) {
        settings.showNames = a;
    };
    wHandle.setSmooth = function(a) {
        settings.fastRenderMax = a ? Infinity : settings.qualityRef.smoothRender;
    };
    wHandle.setChatHide = function(a) {
        settings.showChat = !a;
        drawChat();
    };
    wHandle.setShowGrid = function(a) {
        settings.showGrid = a;
    };
    wHandle.setTransparent = function(a) {
        settings.transparentCells = a;
    };
    wHandle.setMonoZoom = function(a) {
        settings.monoZoom = a;
    };
    wHandle.setTransparency = function(a) {
        settings.transparency = a;
    };
    wHandle.setDetailedVirus = function(a) {
        settings.detailedVirus = a;
    };
    wHandle.setAutoRespawn = function(a) {
        settings.autoRespawn = a;
    };
    wHandle.setCellOutline = function(a) {
        settings.qualityRef.cellOutline = a;
        textCache = { };
        massCache = { };
    };
    wHandle.setSpinnerMode = function(a) {
      settings.spinnerMode = a;
    }
    wHandle.setTextOutline = function(a) {
        settings.showTextOutline = a;
        textCache = { };
        massCache = { };
    };
    wHandle.setBigNames = function(a) {
        settings.bigNames = a;
        textCache = { };
        massCache = { };
    };
    wHandle.setClippedNames = function(a) {
        settings.clippedNames = a;
        textCache = { };
        massCache = { };
    };
    wHandle.setGrowAnimation = function(a) {
        settings.fastRenderMax = a;
    };
    wHandle.setQuality = function(a) {
        if (qualitySettings[a] && settings.quality !== a) {
            settings.quality = a;
            settings.qualityRef = qualitySettings[a];
            settings.fastRenderMax = settings.fastRenderMax == 4 ? 4 : settings.qualityRef.smoothRender;
            textCache = { };
            massCache = { };
        }
    };
    wHandle.spectate = function(a) {
        WsSend(UINT8_CACHE[1]);
        userScore = 0;
        hideESCOverlay();
    };
    wHandle.play = function(a) {
        $('#clan').val($('#clan').val().toUpperCase());
        var thisClanName = $('#clan').val();
        function clanError(err) {
          $('#warningText').html(err);
          $('#warning').show();
          $('#warningInner').animateCss('bounceIn');
          pushChat('INFO',err,color.red);
          $('#clan').val('');
          $('#clan').focus();
          setTimeout(function(){$('#warning').fadeOut();},3000);
        }
        if (connected.name.toLowerCase() == 'clanwars') {
          if (thisClanName.replace(/\s/g,'') == '') {
            clanError('You need a clan to play ClanWars!');
            return;
          }
        }
        if (/\s/g.exec(thisClanName)) {
          clanError('A clan name cannot include spaces.');
          return;
        } else if (thisClanName.length > 3) {
          clanError('Your clan name cannot be more than 3 characters long.');
          return;
        }
        Play(a);
        hideESCOverlay();
    };
    wHandle.openSkinsList = function() {
      setTimeout(function(){
        if ($('#inPageModalTitle').text() != "Skins") {
            $.get('/api/include/gallery').then(function(data) {
                $('#inPageModalTitle').text("Skins");
                $('#inPageModalBody').html(data);
            });
        }
      }, 1000);
    };
    wHandle.openPlaylist = function() {
      setTimeout(function(){
        if ($('#playlistTitle').text() != "Playlist") {
            $.get('/api/include/playlist').then(function(data) {
                $('#playlistTitle').text("Playlist");
                $('#playlistBody').html(data);
            });
        }
      }, 1000);
    };
    
    var hiscores = {
      limit: 10,
      get: function(a) {
        $.get('/api/hiscores/get?limit='+hiscores.limit+'&mode='+$('#hiscoresMode').val().toLowerCase(), function(data) {
          $('#hiscoresBlock').html(data.replace('<script>','').replace('</script>',''));
        }).always(function() {
          if (!a)
            setTimeout(function(){hiscores.get();},10000);
        });
      },
      set: function(a) {
        hiscores.limit = a;
      }
    }
    
    function b62(n){return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,function(n,e){return String.fromCharCode("0x"+e)}))}
  
    setInterval(function(){checkHiscore();},10000);

    document.getElementById('hiscoresMode').onchange = function() {
      hiscores.get(true);
    };
    document.getElementById('hiscoresLimit').onchange = function() {
      hiscores.set($('#hiscoresLimit').val());
    };

    hiscores.get(); 
    function checkHiscore() {
      if (userScore > hiscore) {
        hiscore = userScore;
        var thisName = userName,
            thisClan = 'N/A';
        var reg = /\{([^]+)\}/.exec(thisName);
        if (reg && reg.length === 2) {
          thisClan = reg[1];
          thisName = thisName.replace(reg[0], "").trim();
        }
        $.get('/api/hiscores/post?name='+thisName+'&clan='+thisClan+'&score='+hiscore+'&mode='+connected.name.toLowerCase()+'&build='+config.build+'&hash='+b62(hiscore), function(data) {});
      }
    }

    setTimeout(function(){
      if ($('#nick').val()) {
        userName = $('#nick').val();
      } else {
        userName = 'An unnamed cell';
      }
    },500);
  
    wHandle.getUserName = function() {
      return userName;
    }
    
    setInterval(checkStreak,3000);

    function checkStreak() {
      if (hiscore) {
        var h = hiscore, streak;
        if (h>100000) { streak = '100k';
        } else if (h>75000) { streak = '100k';
        } else if (h>50000) { streak = '75k';
        } else if (h>30000) { streak = '50k';
        } else if (h>25000) { streak = '25k';
        } else if (h>20000) { streak = '20k';
        } else if (h>15000) { streak = '15k';
        } else if (h>10000) { streak = '10k';
        } else if (h>8000) { streak = '8k';
        } else if (h>5000) { streak = '5k';
        } else if (h>3000) { streak = '3k';
        } else if (h>1000) { streak = '1k'; }
        if (streak && $.inArray(streak,streaks) == -1) {
          streaks.push(streak);
          msend(9,false,streak);
        }
      }
    }
    wHandle.onload = loadInit;
})(window, window.jQuery);
