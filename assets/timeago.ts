import fromnow from 'fromnow';

export function init() {
	let time = document.querySelector('footer time');
	let datetime = time && time.getAttribute('datetime');
	if (datetime) time.textContent = fromnow(datetime, { max: 1 }) + ' ago';
}
