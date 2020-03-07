
export function formatDate(date){
  if(!date) return ''
  var year = date.getFullYear(),
  month = date.getMonth()+1,
  day = date.getDate(),
  hour = date.getHours(),
  minute = date.getMinutes(),
  second = date.getSeconds();
	month = month <10 ? '0' + month : month;
	day = day <10 ? '0' + day : day;
	hour = hour <10 ? '0' + hour : hour;
	minute = minute <10 ? '0' + minute : minute;
  second = second <10 ? '0' + second : second;
  return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;

}