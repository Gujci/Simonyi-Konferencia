var info = document.getElementById("info");
flowplayer("ib026", "flowplayer-3.2.18.swf", {
    clip: {
        bitrates: [
            { url: 'ib026-sd', bitrate: 2000, sd: true, isDefault: true },
            { url: 'ib026-hd', bitrate: 2500, dh: true }
        ],
        urlResolvers: 'brselect',
        live: true,
        provider: 'rtmp',
        connectionProvider: 'clustering'
    },
    plugins:  {
        brselect: {
            url: 'flowplayer.bitrateselect-3.2.14.swf',
            hdButton: {
                place: 'controls',
                splash: {
                    onLabel: ' ',
                    offLabel: ' '
                }
            }
        },
        rtmp: {
            url: "flowplayer.rtmp-3.2.13.swf"
        },
        clustering: {
            url: "flowplayer.cluster-3.2.10.swf",
            hosts: [
                { host: 'rtmp://stream-01.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-02.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-03.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-04.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-05.sch.bme.hu/konferencia' },
                { host: 'rtmp://gc-stream-01.sch.bme.hu/konferencia' },
                { host: 'rtmp://gc-stream-02.sch.bme.hu/konferencia' }
            ],
            loadBalance: true,
            onConnect: function(host, index) {
                info.innerHTML += "attempting to connect: " + host + "<br />";
            },
            onConnectFailed: function(host, index) {
                info.innerHTML += "connection failed to: " + host + "<br />";
            }
        }
    }
});
flowplayer("ib028", "flowplayer-3.2.18.swf", {
    clip: {
        bitrates: [
            { url: 'ib028-sd', bitrate: 2000, sd: true, isDefault: true },
            { url: 'ib028-hd', bitrate: 2500, dh: true }
        ],
        urlResolvers: 'brselect',
        provider: 'rtmp',
        connectionProvider: 'clustering',
        scaling: 'orig'
    },
    plugins:  {
        brselect: {
            url: 'flowplayer.bitrateselect-3.2.14.swf',
            hdButton: {
                place: 'controls',
                splash: {
                    onLabel: ' ',
                    offLabel: ' '
                }
            }
        },
        rtmp: {
            url: "flowplayer.rtmp-3.2.13.swf"
        },
        clustering: {
            url: "flowplayer.cluster-3.2.10.swf",
            hosts: [
                { host: 'rtmp://stream-01.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-02.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-03.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-04.sch.bme.hu/konferencia' },
                { host: 'rtmp://stream-05.sch.bme.hu/konferencia' },
                { host: 'rtmp://gc-stream-01.sch.bme.hu/konferencia' },
                { host: 'rtmp://gc-stream-02.sch.bme.hu/konferencia' }
            ],
            loadBalance: true,
            onConnect: function(host, index) {
                info.innerHTML += "attempting to connect: " + host + "<br />";
            },
            onConnectFailed: function(host, index) {
                info.innerHTML += "connection failed to: " + host + "<br />";
            }
        }
    }
});