const KakaoStrategy = require('passport-kakao').Strategy; //기존 모듈과는 다르게  Strategy class를 불러와야 합니다.

const {User} = require('../models');

module.exports = (passport) =>{
    passport.use(new KakaoStrategy({
        clientID:process.env.KAKAO_ID, //카카오톡 클라이언트 id (REST API값 입력)
        callbackURL:'/auth/kakao/callback',//callback url 설정 : 회원가입 혹은 로그인 후 결과값 전송, 인증 진행
    
}, async(accessToken,refereshToken,profile,done)=>{
    try{
        const exUser = await User.findOne({ where: {snsId:profile.id, provider:'kakao'}});//이미 존재하는 유저인지 db에서 확인
        console.log(profile);//사용자의 정보는 profile에 담겨 있습니다. 
        
        if(exUser){
            done(null,exUser);//존재하는 유저이면 회원가입 종료
        }else{
            const newUser = await User.create({//새로운 유저 정보 가져오기
                email: profile._json && profile._json.kaccount_eamil,
                nick: profile.displayName,
                snsId:profile.id,
                provider:'kakao',
            });
            done(null,newUser);

        }
    }catch(error){
        console.error(error);
        done(error);
    }
}));
};