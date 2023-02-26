## 📚 쿼타랩 FE 과제 

<br>
<strong>🌈 목차</strong>
<br>

- [Intro](#Intro)
- [프로젝트 기간](#프로젝트-기간)
- [Check List](#check-list)
- [Project Architecture](#project-architecture)
- [Tools](#tools)
- [ GIF & Image ](#gif--image)


  
<br>

## Intro

쿼타랩 FE 사전 테스트로 진행된 프로젝트입니다.
해당 회사의 주주 정보를 테이블로 출력하고, 주주 정보를 추가하는 기능을 가지고 있습니다.   

<br>


## 프로젝트 기간

: 2022.02.21 ~ 2023.02.27
<br>




 ## Check List

<strong>: 주어진 요구사항에 대한 구현 완료 </strong>
<mark style='background-color: yellow'> 💡 실제 구현 코드를 간략화한 코드들입니다. (화살표 버튼을 클릭하여 글을 확인해주세요.)</mark>

####  ✅ 주주 정보 조회 페이지
 <details>
 <summary>주주 목록 조회 API를 호출하여, 우리 회사 주주들의 정보를 테이블에 렌더해주세요.</summary>

 ```typescript
 // components/StakeholderList/Table.tsx
const Table = () => {
  const { stakeholderlist } = useGetStakeholder()
  return (
        <Theader> 이름, 주식종류, 보유수량, 주당 단가, 취득일 </Theader>

        {stakeholderlist?.data.map((s: Stakeholder) => {
            return (
              <TBody key={s.name}>
                <tr>
                  <td>{s.name}</td>
                  <td>{s.stockType}</td>
                  <td>{s.stockAmount}</td>
                  <td>{s.stockPrice}</td>
                  <td>{s.grantedAt}</td>
                </tr>
              </TBody>
            );
          })}
        <TFooter> 합계 </TFooter>
    
  );
};
 ```
 ```typescript
// hooks/useGetStakeholder.tsx
const useGetStakeholder = () => {
  const { data: stakeholderlist, isLoading } = useQuery(QueryKeys.stakeholder, getStakeholderList, {
    staleTime: 300000, 
    cacheTime: 300000, 
  });

  return { stakeholderlist, isLoading };
};

 const getStakeholderList = async () => {
  try {
    const response = await axios.get(`/stakeholders`);
    return response;
  } catch (err)  console.log('err', err);
};

export default useGetStakeholder;
 ```
 </details>
<br>
 <details>
 <summary>불러온 주주 정보를 주식 보유 수량 내림차순으로 정렬해주세요.</summary>

 ```typescript
 stakeholderlist?.data
          .sort((a: StockAmount, b: StockAmount) => b.stockAmount - a.stockAmount)
 ```
 </details>
 <br>
 <details>
 <summary>“보유한 주식의 총 가치가 10억원 이상” 또는 “지분율이 2%” 이상인 주주는 대주주로 표시해주세요.</summary>

 ```typescript
   const isMajorStakeholder = (s.stockAmount / company?.data.totalStockAmount) * 100 >= 2 || s.stockAmount * s.stockPrice >= 1000000000;
            
   return (
           <TBody key={s.name}>
               ...
              {isMajorStakeholder && <MajorStakeholder>👑 대주주</MajorStakeholder>}
               ...
           </TBody>
         );
 ```
 </details>
 <br>
<details>
 <summary>테이블의 하단에는 현재 불러온 주주들의 보유 수량을 모두 합친 합계를 표현해주세요.</summary>

 ```typescript
const totalAmount = useMemo(
    () => stakeholderlist?.data.reduce((acc: number, curr: { stockAmount: number }) => acc + curr.stockAmount, 0) || 0,
    [stakeholderlist]
  );

return(
     <TFooter>
          <td colSpan={2}> 합계 </td>
          <td> totalAmount </td>
          <td colSpan={2} />
    </TFooter>
)
 ```
 </details>
 <br>
<details>
 <summary>“주주 추가하기” 버튼을 클릭하면 주주 추가 페이지로 이동해야해요.</summary>

```typescript
// components/StakeholderList/Topmenu.tsx
const TopMenu = () => {
  return (
    <>
      <TopMenuWrapper>
        <Title>주주 정보</Title>
        <Link to="/stakeholderAdd" style={{ textDecorationLine: 'none' }}>
          <AddButton> <div>주주 추가</div></AddButton>
        </Link>
      </TopMenuWrapper>
    </>
  );
};
```
</details>

<br>
<strong> ✚ 부가 기능 </strong>

<details>
 <summary>1000 단위 콤마 표시하기 </summary>

- [toLocaleString()](https://blog.munilive.com/posts/javascript-localization-with-toLocaleString.html) : 특정 자료가 들어왔을 때, 설정해놓은 지역에서 읽는 형태로 바꿔주는 Javascript 내장함수.  number가 들어온다면  1000단위로 끊어줌.
- [toString()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) + [replace()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace) + [정규식 사용하기](https://mizzo-dev.tistory.com/entry/JavaScript%EC%A0%95%EA%B7%9C%EC%8B%9D-%EC%88%AB%EC%9E%90%EC%97%90-1000%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%BD%A4%EB%A7%88%EC%89%BC%ED%91%9C-%EA%B5%AC%EB%B6%84%EC%9E%90-%EB%84%A3%EA%B8%B0)
 ```typescript
const commaMark = React.useCallback((num: number): string => {

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // return num.toLocaleString();
  }, []);


 ...

  <TBody>
    <td className="b3">{commaMark(s.stockAmount)}</td>
    <td className="b4">₩{commaMark(s.stockPrice)}</td>
  </TBody>
  <TFooter>
   <td className="f2"> {commaMark(totalAmount)}</td>
  </TFooter>
 ```
 </details>
<details>
 <summary> 날짜 명시적으로 표시하기 </summary>

- [dayjs](https://developer-talk.tistory.com/287) : 날짜 처리를 간편하게 할 수 있도록 도와주는 라이브러리
 ```typescript
// 2018-02-11T00:00:00.000Z 👉 2018-02-11
 <td>{dayjs(s.grantedAt).format('YYYY-MM-DD')}</td>
 ```
 </details>

#### ✅ 주주 추가 페이지

 <details>
 <summary>주주 이름, 주식 종류, 부여할 주식 수량 3가지 정보를 입력하여 새로운 주주를 추가할 수 있는 페이지를 구현해주세요.</summary>

 ```typescript
// components/StakeholderAdd/AddForm.tsx
const AddForm = () => {
   ...
  const [name, onChangeName] = useInput(''); // input입력에 대한 커스텀훅 
  const [stockType, setStockType] = useState('');
  const [stockAmount, onChangeStockAmount] = useInput(0); 

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStockType(event.target.value);
  };
  ...
  return (
    <>
      <form onSubmit={handleSubmit}>

          // 주주이름
          <StakeholderName>주주 이름 </StakeholderName>
          <StakeholderNameInput name="name" type="text" placeholder="이름 입력" onChange={onChangeName} />

          // 알림문구 
          <AlertText>기관 투자를 받은 경우엔 기관명, 펀드 투자를 받은 경우엔 펀드명을 입력해주세요.</AlertText>

          // 주식종류
          <StockType>주식 종류</StockType>
          <StockTypeInput>
            <Select value={stockType} onChange={handleChange} placeholder="주식 종류 선택">
                  <option value="보통주식">보통주식</option>
                  <option value="상환전환우선주식 1종">상환전환우선주식 1종</option>
                  <option value="상환전환우선주식 2종">상환전환우선주식 2종</option>
                  <option value="상환전환우선주식 3종">상환전환우선주식 3종</option>
            </Select>
          </StockTypeInput>

          // 주식수량
          <StockAmount>주식 수량</StockAmount>
          <StockAmountInput name="stockAmount" type="number" min={1} placeholder="수량 입력" onChange{onChangeStockAmount} />

         // 추가버튼   
         <SubmitButtonWrapper>
           <Button type="submit">추가하기</Button>
         </SubmitButtonWrapper>
      </form>
    </>
  );
};
 ```
 </details>
<br>
 <details>
 <summary>3가지 정보 모두 “필수 입력" 정보이기 때문에 모든 정보가 입력된 이후에 “추가하기" 버튼이 활성화되어야해요.</summary>

- 필수 입력에 대한 알림창 사용자에게 제공하기
<img width="246" alt="스크린샷 2023-02-26 오후 10 10 12" src="https://user-images.githubusercontent.com/81337674/221412434-b312ea57-e584-4142-b405-40e750c2b184.png">

 ```typescript
   const isActive = name && stockType && stockAmount;

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isActive) { // 세가지 입력칸에 모두 입력시
      createStakeholder({ name, stockType, stockAmount });
    } else { // 그렇지 않을 경우 toast UI 출력하기
      toast({
        title: '모든 정보를 입력해주세요.',
        status: 'warning',
        isClosable: true,
      });
    }
  };

   // 또는 disabled 사용
   <Button type="submit" disabled={!isActive}>추가하기</Button>




 ```
 </details>
 <br>
 <details>
 <summary>새로운 주주를 추가하는 것에 성공했다면 브라우저 기본 얼럿을 사용하여, 사용자에게 주주 추가 작업이 성공했음을 알려준 후, 주주 정보 조회 페이지로 다시 이동시켜주세요.</summary>

- 주주 정보 추가 성공에 대한 알림창 사용자에게 제공하기
<img width="246" alt="스크린샷 2023-02-26 오후 10 10 20" src="https://user-images.githubusercontent.com/81337674/221412436-63a51f08-dc13-4189-9a94-4eb84b48cfea.png">

 ```typescript
// hooks/useAddStakeholder.ts
const addStakeholderFetch = async ({ name, stockType, stockAmount }: MutableStakeholder) => {
  try {
    await axios.post('/stakeholders', { name, stockType, stockAmount});
  } catch (err) {
    console.log('error', err);
  }
};

const useAddStakeholder = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();
   ...

  const { mutate: createStakeholder } = useMutation(
    ({ name, stockType, stockAmount }: MutableStakeholder) => addStakeholderFetch({ name, stockType, stockAmount }),
    {
      onSuccess: () => {
        navigate('/'); // 주주 정보 조회 페이지로 이동 
        toast({ // 브라우저 기본 얼럿 대신 Toast UI 알림창 출력
          title: '주주정보가 추가되었습니다!',
          status: 'success',
          isClosable: true,
        });
      },
    }
  );
  return { createStakeholder };
};
 ```
 
 </details>
 <br>
<details>
 <summary>주주 정보 조회 페이지로 이동했을 때, 새롭게 추가한 주주의 정보도 테이블에 함께 표현되어야 합니다.</summary>

 - invalidateQuries : query의 cache를 무효화하여, 새로운 데이터를 다시 가져오도록 유도하는 함수
 👉 주주 정보 테이블에 기존의 데이터가 아닌 새롭게 추가된 데이터가 출력.
 ```typescript
const queryClient = useQueryClient();

const { mutate: createStakeholder } = useMutation(
    ({ name, stockType, stockAmount }: MutableStakeholder) => addStakeholderFetch({ name, stockType, stockAmount }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.stakeholder); //stakeholder에 대한 쿼리 무효화
         ...
      },
    }
  );
  return { createStakeholder };
};

export default useAddStakeholder;

 ```
 </details>

 <br>

#### ✅ Donut Chart

<details>
 <summary>주주 정보 조회 페이지의 상단에 주주들의 지분율을 표현할 수 있는 도넛 차트를 렌더해주세요.</summary>

 - [react-google-charts](https://www.react-google-charts.com/) : 여러 종류의 차트 모양을 제공하는 라이브러리

 ```typescript
const DonutChart = () => {
  const { stakeholderlist } = useGetStakeholder();
  const { company } = useGetCompany();

  const data = useMemo(() => {
    const chartData: (string | number)[][] = [['Task', 'Hours per Day']];

    if (stakeholderlist?.data && company?.data) { // 데이터 유효 시
      const totalStockAmount = company.data.totalStockAmount; // 회사 총 주식 발행량

      stakeholderlist?.data.map((s: Stakeholder) => {
        // 지분율 =  보유수량 / 주식 총 발행량 * 100 
        chartData.push([s.name, (s.stockAmount / totalStockAmount) * 100]); // chartData에 ['이름', 지분율] push
      });
    }
    return chartData;
  }, [stakeholderlist?.data, company?.data]);

  const options = { pieHole: 0.4, is3D: false };

  return (
    <ChartWrapper>
      <Chart chartType="PieChart" width="100%" height="400px" data={data} options={options} />
    </ChartWrapper>
  );
};
 ```
 </details>
<br>

#### 💡 Navbar

NavBar의 경우 직접 피그마를 참고하여 구현해보고 싶어서 직접 컴포넌트를 작성하였습니다.
👉 [branch](https://github.com/pjh1011409/quotalab-codingtest/tree/2_feature/navbar/src/components/NavBar)  확인하기!

#### 💡 Load Spinner & Skeleton

사용자 경험을 개선시키기 위하여 스피너와 스켈레톤 UI를 생성하여 출력해보았습니다.
👉 [branch](https://github.com/pjh1011409/quotalab-codingtest/tree/8_feature/refactoring/src/components/LoadUI) 확인하기!

##  Project Architecture

```
⭐️ src
|
├── 🗂 _mocks
│   ├── 📄 handler.js
│   └── 📄 worker.js
│
├── 🗂 components
│   │
│   ├── 🗂 StakeholderAdd
│   │     ├── 📄 index.tsx
│   │     ├── 📄 AddForm.tsx
│   │     └── 📄 TopMenu.tsx
│   │
│   ├── 🗂 StakeholderList
│   │     ├── 📄 index.tsx
│   │     ├── 📄 Table.tsx
│   │     └── 📄 TopMenu.tsx
│   │
│   ├── 🗂 NavBar
│   │     ├── 📄 index.tsx
│   │     ├── 📄 ComapanySelect.tsx
│   │     ├── 📄 QuotaHeader.tsx
│   │     └── 📄 Profile.tsx
│   │
│   ├── 🗂 DonutChart
│   │     └── 📄 index.tsx
│   │
│   └──  🗂 LoadUI
│         ├── 📄 LoadSpinner.tsx
│         └── 📄 Skeleton.tsx
│
├── 🗂 hooks
│     ├── 📄 useGetStakeholder.ts
│     ├── 📄 useGetComapny.ts
│     ├── 📄 useAddStakeholder.ts
│     ├── 📄 useCustomToast.ts
│     └── 📄 useInput.ts
│   
├── 🗂 layout - 📄 layout.tsx
│
├── 🗂 pages 
│     ├──  🗂 stakeholderListPage - 📄 index.tsx
│     └──  🗂 stakeholderAddPage - 📄 index.tsx
│
├──  📄 App.tsx
├──  📄 index.js
└──  📄 queryClient.ts
```


##  Tools

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">   
<br>
<img src="https://img.shields.io/badge/MSW-D9272E.svg?style=for-the-badge&logo=MEGA&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Emotion-F16521?style=for-the-badge&logo=Etsy&logoColor=white">
<img src="https://img.shields.io/badge/Ant Design-0170FE?style=for-the-badge&logo=Ant Design&logoColor=white">
<img src="https://img.shields.io/badge/Chakra UI-319795?style=for-the-badge&logo=Chakra UI&logoColor=white">
<br>
<img src="https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
<img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">

<br>

## GIF & Image

|**주주 정보 페이지** | **주주 추가 페이지**  |
| :------: | :--------------: |
|<img width="1487" alt="주주정보페이지" src="https://user-images.githubusercontent.com/81337674/221402932-47adba80-ad54-45ab-a2a2-48d58f4f8fdd.png">|<img width="1487" alt="주주추가페이지" src="https://user-images.githubusercontent.com/81337674/221402930-2161eaa8-b2a4-4932-9588-65089f906eee.png">  |
| **주주 추가하기** | **Spinner & Skeleton UI**|
|![주주정보추가](https://user-images.githubusercontent.com/81337674/221402928-a78c26ad-9faf-43f4-b49c-7407f8509cd6.gif)|![로딩UI](https://user-images.githubusercontent.com/81337674/221402927-69e3090c-ec98-42c1-ab64-0190592cea71.gif) |


