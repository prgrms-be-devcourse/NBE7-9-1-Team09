import Image from 'next/image';
import ProductInteraction from './components/ProductInteraction';

/* // 임의 커피원두 데이터
const products = [
  {
    id: '1',
    name: '커피 원두 1',
    description: '은은한 산미와 꽃향기가 특징인 원두입니다. 신선한 블루베리와 자스민 향이 입안 가득 퍼지며, 목 넘김 후에는 깔끔한 단맛이 은은하게 남아 기분 좋은 여운을 선사합니다. 섬세한 아로마와 균형 잡힌 맛을 찾는 분께 추천합니다.',
    price: 1000,
    imageUrl: '/images/coffee1.png',
  },
  {
    id: '2',
    name: '커피 원두 2',
    description: '묵직한 바디감과 다크 초콜릿의 쌉쌀한 맛이 어우러진 원두입니다. 강렬한 풍미와 함께 구운 아몬드의 고소함이 느껴지며, 설탕을 첨가하지 않아도 캐러멜의 달콤한 향이 코끝을 맴돕니다. 깊고 풍부한 맛을 선호하는 분들을 위한 완벽한 선택입니다.',
    price: 2000,
    imageUrl: '/images/coffee2.png',
  },
  {
    id: '3',
    name: '커피 원두 3',
    description: '고소한 견과류 풍미와 부드러운 목넘김을 가진 원두입니다. 헤이즐넛과 호두의 풍부한 맛이 입안을 가득 채우며, 마치 따뜻한 라떼를 마시는 듯한 편안함을 제공합니다. 부드러운 질감과 은은한 단맛이 특징으로, 매일 마셔도 질리지 않는 데일리 커피입니다.',
    price: 3000,
    imageUrl: '/images/coffee3.png',
  },
  {
    id: '4',
    name: '커피 원두 4',
    description: '달콤한 카라멜과 상큼한 과일향이 조화로운 원두입니다. 잘 익은 오렌지 껍질과 살구의 상큼함이 카라멜의 달콤함과 완벽하게 어우러져 독특하면서도 매력적인 맛을 선사합니다. 밝고 화사한 풍미로 새로운 커피 경험을 원하는 분들에게 이상적입니다.',
    price: 4000,
    imageUrl: '/images/coffee4.png',
  },
]; */


async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
  });

  // 404 응답 코드 처리
  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }

  return res.json();
}


// 서버 컴포넌트: page.tsx
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const product = await getProduct(productId);

  if (!product) {
    return (<div className="flex flex-col justify-center items-center w-full min-h-screen bg-white p-10">

      {/* 출력 이미지 */}
      <Image
        src="/images/empty.png"
        alt="상품 없음"
        width={350}
        height={350}
        className="mb-30"
      />

      {/* 출력 메세지 */}
      <h1 className="text-5xl font-extrabold">
        존재하지 않는 상품입니다.
      </h1>
    </div>);
  }

  // description 줄바꿈 기준
  const descriptionLines = product.description.split('. ').filter((line: string) => line.trim() !== '');
  return (
    <div className="flex justify-center w-full min-h-screen bg-white">

      {/* 상품 상세 정보 카드*/}
      <div className="bg-white p-16 rounded-none shadow-none w-full max-w-screen-2xl flex border-x border-gray-100">

        {/* 이미지 영역 */}
        <div className="flex-none w-1/2 p-8 flex justify-center items-center h-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg object-contain w-full h-full"
          />
        </div>

        {/* 상세 정보 및 상호작용 영역 */}
        <div className="flex-auto w-7/12 p-8 space-y-8">

          {/* 상품명 */}
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

          {/* 상세 설명 */}
          <div className="space-y-4 text-gray-600">
            <p className="text-2xl font-semibold mb-4 text-gray-800">상세 설명</p>
            {descriptionLines.map((line: string, index: number) => (
              <p key={index} className="text-lg leading-relaxed text-gray-700 max-w-2xl">
                {line.trim()}{index < descriptionLines.length - 1 ? '.' : ''}
              </p>
            ))}
          </div>

          <hr className="my-8 border-gray-200" />

          {/* 가격, 수량 조절 등 상호작용이 필요한 부분 (클라이언트 컴포넌트) */}
          <ProductInteraction product={product} />

        </div>
      </div>
    </div>
  );
}