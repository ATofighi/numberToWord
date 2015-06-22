numberToWordObj = {
	suffix: ['', 'هزار', 'میلیون', 'میلیارد', 'بیلیون', 'بیلیارد', 'تریلیون', 'تریلیارد', 'کوآدریلیون', 'کادریلیارد', 'کوینتیلیون', 'کوانتینیارد', 'سکستیلیون', 'سکستیلیارد', 'سپتیلیون', 'سپتیلیارد', 'اکتیلیون'],
	yekan: ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
	dah: ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'],
	dahegan: ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
	sadegan: ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نه‌صد']
}
function numberToWord(x, zeroToNull) {
	x = x.toString();
	if(x == "0" || x == "+0" || x == "-0") {
		if(!zeroToNull) {
			return 'صفر';
		} else {
			return '';
		}
	}
	if( x.substr(0, 1) == '-') {
		x = x.substr(1);
		return 'منفی ' + numberToWord(x);
	}
	if( x.substr(0, 1) == '+') {
		x = x.substr(1);
		return 'مثبت ' + numberToWord(x);
	}
	var ans = "";
	var k = 0;
	if(x.length < 4) {
		y = [parseInt(x/100), parseInt((x%100)/10), parseInt(x%10)];
		//console.log(y);
		if(y[1] == 1) {
			ans = numberToWordObj.dah[y[2]];
		} else {
			ans = numberToWordObj.yekan[y[2]];
			if(numberToWordObj.dahegan[y[1]] && ans) {
				ans = " و " + ans;
			}
			ans = numberToWordObj.dahegan[y[1]] + ans;
		}
		if(numberToWordObj.sadegan[y[0]] && ans) {
			ans = " و " + ans;
		}
		ans = numberToWordObj.sadegan[y[0]] + ans;
		return ans;
	}
	while(x != "") {
		s = numberToWord(x.substr(-3), true);
		x = x.substr(0, (x.length-3 > 0)? x.length-3 : 0);
		if(s) {
			if(ans) {
				ans = " و " + ans;
			}
			ans = s + " " + numberToWordObj.suffix[k] + ans;
		}
		++k;
	}
	return ans;
}
