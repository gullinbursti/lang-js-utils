'use strict';


const Remotes = {
	fetchFavicon   : (url)=> {
	},
	fetchImageData : (url)=> {
	},
	isOnline       : ()=> (true),
	ping           : (host, port, pong, protocol='https')=> {
		const start = new Date().getTime();
		const http = new XMLHttpRequest();
		http.open('GET', `${protocol}://${host}:${port}`, true);
		http.onreadystatechange = ()=> {
			if (http.readyState === 4) {
				const ms = new Date().getTime() - start;
				if (pong != null) {
					pong(ms);
				}
			}
		};

		try {
			http.send(null);

		} catch(exception) {
			if (pong != null) {
				pong(-1);
			}
		}
	}
};


export default (Remotes);
