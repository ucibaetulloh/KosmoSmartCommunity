global.countryCode = 'eng';
var languages = {
    'eng': {
        'global':{
            'alert': 'Alert',
            'cancel': 'Cancel',
            'ok': 'Ok',
			'delete': 'Delete',
			'yes': 'Yes',
			'no': 'No'
        },
        'communityselect': {
            'dynamax': 'Dynamax',
            'jakartagardencity': 'Jakarta Garden City'
        },
        'menu': {
            'menu1': 'Home',
            'menu2': 'Smart Home',
            'menu3': 'Entertain',
            'menu4': 'Marketplace',
            'menu5': 'Profile'
        },
        'header': {
            'back': 'Back',
			'add': 'Add'
        },
        'home': {
            'title': 'HOME',
            'invalid_account':'Invalid username or password',
            'dynamax': 'Dynamax'
        },
        'news': {
            'title': 'NEWS',
        },
        'entertainment': {
            'title': 'Entertainment',
        },
        'marketplace': {
            'title': 'Marketplace',
        },
        'mypage': {
            'title': 'Profile',
            'company':'Company',
            'share':'Share',
            'order':'Orders',
            'payment': 'Payments',
            'message': 'Messages',
            'setting': 'Settings',
            'addressbook': 'Address',
            'other': 'Others',
            'transaction': 'Transaction',
            'inbox': 'Inbox',
            'personal': 'Information',
            'linkaccount': 'Account',
            'password': 'Password',
            'about': 'About',
            'logout': 'Logout'
        },
        
        'profile': {
            'title': 'Personal Information',
            'change': 'Change',
            'phone': 'Phone Number',
            'email': 'Email',
            'name': 'Full Name',
            'nickname': 'Nickname',
            'gender': 'Gender',
            'dob':'Date of birth',
            'pleaseinputprofile': 'Please input your mobile phone',
            'businesscard': 'Bussiness Card',
            'company': 'Company',
            'location': 'Location',
            'joinsince': 'Join Since'
        },
        'moment': {
            'title': 'Moment',
        },
        'company':{
            'title': 'COMPANY'
        },
        'share':{
            'title': 'SHARE'
        },
        'order':{
            'title': 'ORDERS'
        },
        'payment':{
            'title': 'PAYMENTS'
        },
        'massage':{
            'title': 'MASSAGES'
        },
        'inbox':{
            'title': 'Inbox',
            'inbox1': 'You have successfully login',
            'tgl1': 'Today, 08:33 am',
            'inbox2': 'Please pay your bill',
            'tgl2': '06, Aug, 11:33 pm'
        },
        'linkaccount':{
            'title': 'Link Account',
            'username': 'Username',
            'password': 'Password',
            'input_username': 'Input your username',
            'inputPass': 'Input your password',
            'please_input_username': 'Please input your username!',
            'please_input_password': 'Please input your password!',
            'login_to_your_account': 'Login in to your account',
            'invalid_account':'Invalid username or password',
            'donthaveanaccount': 'Don\'t have an account?',
            'btnsend': 'BINDING ACCOUNT'
        },
        'password':{
            'title': 'Set Password',
            'phonenumber': 'Mobile Phone',
            'oldPass': 'Current Password',
            'newPass': 'New Password',
            'confirmPass': 'Confirm Password',
            'inputCurrent': 'Please input your old password',
            'faled_pass_old': 'Please fill in the old password!',
            'inputNewPass': 'At least 8 characters',
            'faled_pass_new': 'Please fill in the new password!',
            'inputConfirmPass': 'At least 8 characters',
            'faled_pass_confrim': 'Please fill in the confirm password!',
            'faled_samepass': 'New password is not the same as confirmation password',
            'invalidlogin':'Invalid mobile phone or password',
            'setpassword': 'Set your password',
            'updatePass': 'UPDATE PASSWORD'

        },
        'forgotpass':{
            'title': 'Forgot Password',
            'phonenumber': 'Mobile Phone',
            'oldPass': 'Current Password',
            'newPass': 'New Password',
            'confirmPass': 'Confirm Password',
            'inputnumber': 'Ex:08xxx',
            'faled_phone': 'Please fill in the phone number',
            'inputCurrent': 'Please input your old password',
            'faled_pass_old': 'Please fill in the old password',
            'inputNewPass': 'At least 8 characters',
            'faled_pass_new': 'Please fill in the new password!',
            'inputConfirmPass': 'At least 8 characters',
            'faled_samepass': 'New password is not the same as confirmation password',
            'faled_pass_confrim': 'Please fill in the confirm password!',
            'invalidlogin':'Invalid mobile phone or password',
            'setpassword': 'Set your password',
            'updatePass': 'SUBMIT',
            'inputyourpassword': 'Input your new password',
            'confirmyourpassword': 'Input confirm password',

        },
        'transaction':{
            'title': 'Transaction History',
            'filter': 'Search',
            'ipkl': 'IPKL'
            
        },
        'about':{
            'title': 'About',
            'version': 'Version 1.0.10',
            'release': 'Release on 17 Juni 2019',
            'content1': 'Living for the life',
            'content2': 'Easy choice for your home living'
        },

        'setting': {
            'title': 'SETTING',
            'personalinformation': 'Personal Information',
            'accountbinding': 'Account Binding',
            'setpassword': 'Set Password',
            'notification': 'Notification',
            'clearcache': 'Clear Cache',
            'encourage': 'Encourage',
            'aboutus': 'About',
            'recommend': 'Recommend',
            'feedback':'Feedback',
            'logout': 'Logout'
        },
        'addressbook':{
            'title': 'ADDRESS'
        },
        'other':{
            'title': 'OTHERS'
        },
        'login':{
            'title': 'Login',
            'phonenumber': 'Mobile Phone',
            'inputyourphone': 'Input your mobile phone number',
            'password': 'Password',
            'inputyourpassword': 'Input your password',
            'login': 'Login',
            'logintoyouraccount': 'Login in to your account',
            'pleaseinputphone': 'Please input your mobile phone!',
            'pleaseinputpassword': 'Please input your password!',
            'invalidlogin':'Invalid mobile phone or password!',
            'donthaveanaccount': 'Don\'t have an account?',
            'register': 'Sign up',
            'passwordlink': 'Forgot Password'
        },
        'preparequit':{
            'title': 'Click once more to quit'
        },
        'register':{
            'title': 'Register',
            'register': 'Register',
            'registeryouraccount': 'Register your account',
            'phonenumber': 'Phone Number',
            'inputyourphone': 'Ex: 08xxx',
            'password': 'Password',
            'inputyourpassword': 'Input your password',
            'confirmpassword': 'Confirm Password',
            'confirmyourpassword': 'Input confirm password',
            'name': 'Full Name',
            'inputyourname': 'Input your full name',
            'nickname': 'Nickname',
            'inputyournickname': 'Input your nickname',
            'gender': 'Gender',
            'dob':'Birth Date',
            'email':'Email',
            'inputyouremail': 'Ex: email@domain.com',
            'company': 'Company',
            'inputyourcompany': 'Input your company',
            'location': 'Location',
            'inputyourcompanylocation': 'Input your company location',
            'next' : 'Next',
            'invalidconfirmpassword': 'Password and Confirm Password is not same'
        },
        'otp':{
            'title':'Confirmation Code'
        },
		'accountbinding':{
			'title': 'Account Binding',
			'type': 'User Type',
			'name': 'Name',
			'address': 'Address',
			'phonenumber': 'Phone Number',
			'email': 'E-mail',
			'password': 'Password',
			'confirmpassword': 'Confirm Password',
			'register': 'Register',
            'invalidconfirmpassword': 'Password and Confirm Password does not match',
            'invalidlogin':'Invalid username or password',
			'inputyourname': 'Input your name',
			'inputyourpassword': 'Input your password',
		},
		'accountbindinglist':{
			'title': 'Account List',
			'deleteaccount': 'Delete Account',
			'areyousure': 'Are you sure you want to delete this account?'
		}
    },
    'chn': {
        'global':{
            'alert': '警报',
            'cancel': '取消',
            'ok': '好的',
			'delete': '删除',
			'yes': '是',
			'no': '不'
        },
        'communityselect': {
            'dynamax': '德诺迈斯',
            'zhangzou': '漳州'
        },
        'menu': {
            'menu1': '服务',
            'menu2': '智控',
            'menu3': '娱乐',
            'menu4': '智选',
            'menu5': '我的'
        },
        'header': {
            'back': '回去',
			'add': '加'
        },
        'home': {
            'title': '服务',
            'dynamax': '德诺迈斯'
        },
        'news': {
            'title': '公告',
        },
        'entertainment': {
            'title': '娱乐',
        },
        'marketplace': {
            'title': '智选',
        },
        'mypage': {
            'title': '智选',
        },
        'mypage': {
            'title': '用户资料',
            'company':'公司',
            'share':'分享',
            'order':'订购',
            'payment': '付款',
            'message': '信息',
            'setting': '设置',
            'addressbook': '地址簿',
            'other': '其他'
        },
        'profile': {
            'title': '轮廓',
            'change': '更换图片',
            'phone': '手机号码',
            'name': '名称',
            'nickname': '昵称',
            'gender': '性别',
            'dob':'出生日期',
            'businesscard': '名片',
            'company': '公司',
            'location': '地点',
            'joinsince': '加入日期'
        },
        'setting': {
            'title': '设置',
            'personalinformation': '个人信息',
            'accountbinding': '帐户绑定',
            'setpassword': '设置密码',
            'notification': '通知',
            'clearcache': '清除缓存',
            'encourage': '鼓励',
            'aboutus': '关于我们',
            'recommend': '推荐给朋友',
            'feedback':'反馈',
            'logout': '登出'
        },
        'company':{
            'title': '公司'
        },
        'share':{
            'title': '分享'
        },
        'order':{
            'title': '命令'
        },
        'payment':{
            'title': '支付'
        },
        'massage':{
            'title': '按摩'
        },
        'addressbook':{
            'title': '地址'
        },
        'other':{
            'title': '其他'
        },
        'login':{
            'title': '登录',
            'phonenumber': '手机号码',
            'inputyourphone': '输入您的手机号码',
            'password': '密码',
            'inputyourpassword': '输入你的密码',
            'login': '登录',
            'logintoyouraccount': '登录到您的帐户',
            'pleaseinputphone': '请输入您的电话号码',
            'pleaseinputpassword': '请输入您的密码',
            'invalidlogin':'手机号码或密码无效',
            'donthaveanaccount': 'Don\'t have an account?',
            'register': 'Sign up'
        },
        'preparequit':{
            'title': '再次单击退出'
        },
        'register':{
            'title': '注册',
            'register': '注册',
            'registeryouraccount': '首先注册您的帐户',
            'phonenumber': '手机号码',
            'inputyourphone': '输入您的手机号码',
            'password': '密码',
            'inputyourpassword': '输入你的密码',
            'confirmpassword': '确认密码',
            'confirmyourpassword': '确认你的密码',
            'name': '名称',
            'inputyourname': '输入你的名字',
            'nickname': '昵称',
            'inputyournickname': '输入你的昵称',
            'gender': '性别',
            'dob':'出生日期',
            'email':'电子邮件',
            'inputyouremail': '输入你的邮箱',
            'company': '公司',
            'inputyourcompany': '输入你的公司',
            'location': '地点',
            'inputyourcompanylocation': '输入您的公司地址',
            'next' : '下一个',
            'invalidconfirmpassword': '密码和确认密码不同'
        },
		'accountbinding':{
			'title': '帐户绑定',
			'type': '用户类型',
			'name': '名称',
			'address': '地址',
			'phonenumber': '电话号码',
			'email': '鄂麦',
			'password': '密码',
			'confirmpassword': '确认密码',
			'register': '寄存器'
		},
		'accountbindinglist':{
			'title': '帐户清单',
			'deleteaccount': '删除帐户',
			'areyousure': '您确定要删除此帐户吗？'
		}
    }
}

export function getPageLang(page) {
    return languages[global.countryCode][page];
}