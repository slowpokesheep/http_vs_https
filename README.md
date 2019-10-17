## Install

```
git clone https://github.com/slowpokesheep/http_vs_https.git
cd http_vs_https
npm install
npm start
```

## Description
`npm start` starts two servers, one http and another https

* HTTP server `http://127.0.0.1:8080`
* HTTPS server `https://127.0.0.1:8443`

## Traffic

* Watch the traffic on localhost and the HTTP port, searching for the password

`sudo tcpdump -i lo port 8080 -A | egrep -i "POST /|pwd=|passwd=|password=|Host:"`

* Watch the traffic on localhost and the HTTPS port

`sudo tcpdump -i lo port 8443 -A`