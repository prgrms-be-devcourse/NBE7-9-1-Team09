export default function HomePage() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      textAlign: 'center',
      padding: '20px',
       backgroundColor: '#BEBBAE'      
    }}>
      <h1 style={{
        fontSize: '48px',
        marginBottom: '50px'
      }}>
        Grid & Circle
      </h1>
      <p style={{
        fontSize: '22px',
        color: '#333',
        lineHeight: '1.6'
      }}>
        올해도 함께해주신 로컬 카페 Grid & Circle는<br/>
        여러분 일상에 따뜻한 휴식을 전합니다.<br/>
        '한 잔의 커피'에 담긴<br/>
        작은 위로와 큰 행복을<br/>
        Grid & Circle에서 느껴보세요.
      </p>
    </main>
  );
}