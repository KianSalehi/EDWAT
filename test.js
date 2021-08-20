let link='https://www.youtube.com/watch?v=J1FK2v5DgK8';
link = link.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
console.log(link);