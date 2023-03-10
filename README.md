## ๐ ์ฟผํ๋ฉ FE ๊ณผ์  

<br>
<strong>๐ ๋ชฉ์ฐจ</strong>
<br>

- [Intro](#Intro)
- [ํ๋ก์ ํธ ๊ธฐ๊ฐ](#ํ๋ก์ ํธ-๊ธฐ๊ฐ)
- [Check List](#check-list)
- [Project Architecture](#project-architecture)
- [Tools](#tools)
- [ GIF & Image ](#gif--image)


  
<br>

## Intro

์ฟผํ๋ฉ FE ์ฌ์  ํ์คํธ๋ก ์งํ๋ ํ๋ก์ ํธ์๋๋ค.
ํด๋น ํ์ฌ์ ์ฃผ์ฃผ ์ ๋ณด๋ฅผ ํ์ด๋ธ๋ก ์ถ๋ ฅํ๊ณ , ์ฃผ์ฃผ ์ ๋ณด๋ฅผ ์ถ๊ฐํ๋ ๊ธฐ๋ฅ์ ๊ฐ์ง๊ณ  ์์ต๋๋ค.   

<br>


## ํ๋ก์ ํธ ๊ธฐ๊ฐ

: 2022.02.21 ~ 2023.02.27
<br>




 ## Check List

<strong>: ์ฃผ์ด์ง ์๊ตฌ์ฌํญ์ ๋ํ ๊ตฌํ ์๋ฃ </strong>
<mark style='background-color: yellow'> ๐ก ์ค์  ๊ตฌํ ์ฝ๋๋ฅผ ๊ฐ๋ตํํ ์ฝ๋๋ค์๋๋ค. (ํ์ดํ ๋ฒํผ์ ํด๋ฆญํ์ฌ ๊ธ์ ํ์ธํด์ฃผ์ธ์.)</mark>

####  โ ์ฃผ์ฃผ ์ ๋ณด ์กฐํ ํ์ด์ง
 <details>
 <summary>์ฃผ์ฃผ ๋ชฉ๋ก ์กฐํ API๋ฅผ ํธ์ถํ์ฌ, ์ฐ๋ฆฌ ํ์ฌ ์ฃผ์ฃผ๋ค์ ์ ๋ณด๋ฅผ ํ์ด๋ธ์ ๋ ๋ํด์ฃผ์ธ์.</summary>

 ```typescript
 // components/StakeholderList/Table.tsx
const Table = () => {
  const { stakeholderlist } = useGetStakeholder()
  return (
        <Theader> ์ด๋ฆ, ์ฃผ์์ข๋ฅ, ๋ณด์ ์๋, ์ฃผ๋น ๋จ๊ฐ, ์ทจ๋์ผ </Theader>

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
        <TFooter> ํฉ๊ณ </TFooter>
    
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
 <summary>๋ถ๋ฌ์จ ์ฃผ์ฃผ ์ ๋ณด๋ฅผ ์ฃผ์ ๋ณด์  ์๋ ๋ด๋ฆผ์ฐจ์์ผ๋ก ์ ๋ ฌํด์ฃผ์ธ์.</summary>

 ```typescript
 stakeholderlist?.data
          .sort((a: StockAmount, b: StockAmount) => b.stockAmount - a.stockAmount)
 ```
 </details>
 <br>
 <details>
 <summary>โ๋ณด์ ํ ์ฃผ์์ ์ด ๊ฐ์น๊ฐ 10์ต์ ์ด์โ ๋๋ โ์ง๋ถ์จ์ด 2%โ ์ด์์ธ ์ฃผ์ฃผ๋ ๋์ฃผ์ฃผ๋ก ํ์ํด์ฃผ์ธ์.</summary>

 ```typescript
   const isMajorStakeholder = (s.stockAmount / company?.data.totalStockAmount) * 100 >= 2 || s.stockAmount * s.stockPrice >= 1000000000;
            
   return (
           <TBody key={s.name}>
               ...
              {isMajorStakeholder && <MajorStakeholder>๐ ๋์ฃผ์ฃผ</MajorStakeholder>}
               ...
           </TBody>
         );
 ```
 </details>
 <br>
<details>
 <summary>ํ์ด๋ธ์ ํ๋จ์๋ ํ์ฌ ๋ถ๋ฌ์จ ์ฃผ์ฃผ๋ค์ ๋ณด์  ์๋์ ๋ชจ๋ ํฉ์น ํฉ๊ณ๋ฅผ ํํํด์ฃผ์ธ์.</summary>

 ```typescript
const totalAmount = useMemo(
    () => stakeholderlist?.data.reduce((acc: number, curr: { stockAmount: number }) => acc + curr.stockAmount, 0) || 0,
    [stakeholderlist]
  );

return(
     <TFooter>
          <td colSpan={2}> ํฉ๊ณ </td>
          <td> totalAmount </td>
          <td colSpan={2} />
    </TFooter>
)
 ```
 </details>
 <br>
<details>
 <summary>โ์ฃผ์ฃผ ์ถ๊ฐํ๊ธฐโ ๋ฒํผ์ ํด๋ฆญํ๋ฉด ์ฃผ์ฃผ ์ถ๊ฐ ํ์ด์ง๋ก ์ด๋ํด์ผํด์.</summary>

```typescript
// components/StakeholderList/Topmenu.tsx
const TopMenu = () => {
  return (
    <>
      <TopMenuWrapper>
        <Title>์ฃผ์ฃผ ์ ๋ณด</Title>
        <Link to="/stakeholderAdd" style={{ textDecorationLine: 'none' }}>
          <AddButton> <div>์ฃผ์ฃผ ์ถ๊ฐ</div></AddButton>
        </Link>
      </TopMenuWrapper>
    </>
  );
};
```
</details>

<br>
<strong> โ ๋ถ๊ฐ ๊ธฐ๋ฅ </strong>

<details>
 <summary>1000 ๋จ์ ์ฝค๋ง ํ์ํ๊ธฐ </summary>

- [toLocaleString()](https://blog.munilive.com/posts/javascript-localization-with-toLocaleString.html) : ํน์  ์๋ฃ๊ฐ ๋ค์ด์์ ๋, ์ค์ ํด๋์ ์ง์ญ์์ ์ฝ๋ ํํ๋ก ๋ฐ๊ฟ์ฃผ๋ Javascript ๋ด์ฅํจ์.  number๊ฐ ๋ค์ด์จ๋ค๋ฉด  1000๋จ์๋ก ๋์ด์ค.
- [toString()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) + [replace()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace) + [์ ๊ท์ ์ฌ์ฉํ๊ธฐ](https://mizzo-dev.tistory.com/entry/JavaScript%EC%A0%95%EA%B7%9C%EC%8B%9D-%EC%88%AB%EC%9E%90%EC%97%90-1000%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%BD%A4%EB%A7%88%EC%89%BC%ED%91%9C-%EA%B5%AC%EB%B6%84%EC%9E%90-%EB%84%A3%EA%B8%B0)
 ```typescript
const commaMark = React.useCallback((num: number): string => {

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // return num.toLocaleString();
  }, []);


 ...

  <TBody>
    <td className="b3">{commaMark(s.stockAmount)}</td>
    <td className="b4">โฉ{commaMark(s.stockPrice)}</td>
  </TBody>
  <TFooter>
   <td className="f2"> {commaMark(totalAmount)}</td>
  </TFooter>
 ```
 </details>
<details>
 <summary> ๋ ์ง ๋ช์์ ์ผ๋ก ํ์ํ๊ธฐ </summary>

- [dayjs](https://developer-talk.tistory.com/287) : ๋ ์ง ์ฒ๋ฆฌ๋ฅผ ๊ฐํธํ๊ฒ ํ  ์ ์๋๋ก ๋์์ฃผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ
 ```typescript
// 2018-02-11T00:00:00.000Z ๐ 2018-02-11
 <td>{dayjs(s.grantedAt).format('YYYY-MM-DD')}</td>
 ```
 </details>

#### โ ์ฃผ์ฃผ ์ถ๊ฐ ํ์ด์ง

 <details>
 <summary>์ฃผ์ฃผ ์ด๋ฆ, ์ฃผ์ ์ข๋ฅ, ๋ถ์ฌํ  ์ฃผ์ ์๋ 3๊ฐ์ง ์ ๋ณด๋ฅผ ์๋ ฅํ์ฌ ์๋ก์ด ์ฃผ์ฃผ๋ฅผ ์ถ๊ฐํ  ์ ์๋ ํ์ด์ง๋ฅผ ๊ตฌํํด์ฃผ์ธ์.</summary>

 ```typescript
// components/StakeholderAdd/AddForm.tsx
const AddForm = () => {
   ...
  const [name, onChangeName] = useInput(''); // input์๋ ฅ์ ๋ํ ์ปค์คํํ 
  const [stockType, setStockType] = useState('');
  const [stockAmount, onChangeStockAmount] = useInput(0); 

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStockType(event.target.value);
  };
  ...
  return (
    <>
      <form onSubmit={handleSubmit}>

          // ์ฃผ์ฃผ์ด๋ฆ
          <StakeholderName>์ฃผ์ฃผ ์ด๋ฆ </StakeholderName>
          <StakeholderNameInput name="name" type="text" placeholder="์ด๋ฆ ์๋ ฅ" onChange={onChangeName} />

          // ์๋ฆผ๋ฌธ๊ตฌ 
          <AlertText>๊ธฐ๊ด ํฌ์๋ฅผ ๋ฐ์ ๊ฒฝ์ฐ์ ๊ธฐ๊ด๋ช, ํ๋ ํฌ์๋ฅผ ๋ฐ์ ๊ฒฝ์ฐ์ ํ๋๋ช์ ์๋ ฅํด์ฃผ์ธ์.</AlertText>

          // ์ฃผ์์ข๋ฅ
          <StockType>์ฃผ์ ์ข๋ฅ</StockType>
          <StockTypeInput>
            <Select value={stockType} onChange={handleChange} placeholder="์ฃผ์ ์ข๋ฅ ์ ํ">
                  <option value="๋ณดํต์ฃผ์">๋ณดํต์ฃผ์</option>
                  <option value="์ํ์ ํ์ฐ์ ์ฃผ์ 1์ข">์ํ์ ํ์ฐ์ ์ฃผ์ 1์ข</option>
                  <option value="์ํ์ ํ์ฐ์ ์ฃผ์ 2์ข">์ํ์ ํ์ฐ์ ์ฃผ์ 2์ข</option>
                  <option value="์ํ์ ํ์ฐ์ ์ฃผ์ 3์ข">์ํ์ ํ์ฐ์ ์ฃผ์ 3์ข</option>
            </Select>
          </StockTypeInput>

          // ์ฃผ์์๋
          <StockAmount>์ฃผ์ ์๋</StockAmount>
          <StockAmountInput name="stockAmount" type="number" min={1} placeholder="์๋ ์๋ ฅ" onChange{onChangeStockAmount} />

         // ์ถ๊ฐ๋ฒํผ   
         <SubmitButtonWrapper>
           <Button type="submit">์ถ๊ฐํ๊ธฐ</Button>
         </SubmitButtonWrapper>
      </form>
    </>
  );
};
 ```
 </details>
<br>
 <details>
 <summary>3๊ฐ์ง ์ ๋ณด ๋ชจ๋ โํ์ ์๋ ฅ" ์ ๋ณด์ด๊ธฐ ๋๋ฌธ์ ๋ชจ๋  ์ ๋ณด๊ฐ ์๋ ฅ๋ ์ดํ์ โ์ถ๊ฐํ๊ธฐ" ๋ฒํผ์ด ํ์ฑํ๋์ด์ผํด์.</summary>

- ํ์ ์๋ ฅ์ ๋ํ ์๋ฆผ์ฐฝ ์ฌ์ฉ์์๊ฒ ์ ๊ณตํ๊ธฐ
<img width="246" alt="แแณแแณแแตแซแแฃแบ 2023-02-26 แแฉแแฎ 10 10 12" src="https://user-images.githubusercontent.com/81337674/221412434-b312ea57-e584-4142-b405-40e750c2b184.png">

 ```typescript
   const isActive = name && stockType && stockAmount;

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isActive) { // ์ธ๊ฐ์ง ์๋ ฅ์นธ์ ๋ชจ๋ ์๋ ฅ์
      createStakeholder({ name, stockType, stockAmount });
    } else { // ๊ทธ๋ ์ง ์์ ๊ฒฝ์ฐ toast UI ์ถ๋ ฅํ๊ธฐ
      toast({
        title: '๋ชจ๋  ์ ๋ณด๋ฅผ ์๋ ฅํด์ฃผ์ธ์.',
        status: 'warning',
        isClosable: true,
      });
    }
  };

   // ๋๋ disabled ์ฌ์ฉ
   <Button type="submit" disabled={!isActive}>์ถ๊ฐํ๊ธฐ</Button>




 ```
 </details>
 <br>
 <details>
 <summary>์๋ก์ด ์ฃผ์ฃผ๋ฅผ ์ถ๊ฐํ๋ ๊ฒ์ ์ฑ๊ณตํ๋ค๋ฉด ๋ธ๋ผ์ฐ์  ๊ธฐ๋ณธ ์ผ๋ฟ์ ์ฌ์ฉํ์ฌ, ์ฌ์ฉ์์๊ฒ ์ฃผ์ฃผ ์ถ๊ฐ ์์์ด ์ฑ๊ณตํ์์ ์๋ ค์ค ํ, ์ฃผ์ฃผ ์ ๋ณด ์กฐํ ํ์ด์ง๋ก ๋ค์ ์ด๋์์ผ์ฃผ์ธ์.</summary>

- ์ฃผ์ฃผ ์ ๋ณด ์ถ๊ฐ ์ฑ๊ณต์ ๋ํ ์๋ฆผ์ฐฝ ์ฌ์ฉ์์๊ฒ ์ ๊ณตํ๊ธฐ
<img width="246" alt="แแณแแณแแตแซแแฃแบ 2023-02-26 แแฉแแฎ 10 10 20" src="https://user-images.githubusercontent.com/81337674/221412436-63a51f08-dc13-4189-9a94-4eb84b48cfea.png">

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
        navigate('/'); // ์ฃผ์ฃผ ์ ๋ณด ์กฐํ ํ์ด์ง๋ก ์ด๋ 
        toast({ // ๋ธ๋ผ์ฐ์  ๊ธฐ๋ณธ ์ผ๋ฟ ๋์  Toast UI ์๋ฆผ์ฐฝ ์ถ๋ ฅ
          title: '์ฃผ์ฃผ์ ๋ณด๊ฐ ์ถ๊ฐ๋์์ต๋๋ค!',
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
 <summary>์ฃผ์ฃผ ์ ๋ณด ์กฐํ ํ์ด์ง๋ก ์ด๋ํ์ ๋, ์๋กญ๊ฒ ์ถ๊ฐํ ์ฃผ์ฃผ์ ์ ๋ณด๋ ํ์ด๋ธ์ ํจ๊ป ํํ๋์ด์ผ ํฉ๋๋ค.</summary>

 - invalidateQuries : query์ cache๋ฅผ ๋ฌดํจํํ์ฌ, ์๋ก์ด ๋ฐ์ดํฐ๋ฅผ ๋ค์ ๊ฐ์ ธ์ค๋๋ก ์ ๋ํ๋ ํจ์
 ๐ ์ฃผ์ฃผ ์ ๋ณด ํ์ด๋ธ์ ๊ธฐ์กด์ ๋ฐ์ดํฐ๊ฐ ์๋ ์๋กญ๊ฒ ์ถ๊ฐ๋ ๋ฐ์ดํฐ๊ฐ ์ถ๋ ฅ.
 ```typescript
const queryClient = useQueryClient();

const { mutate: createStakeholder } = useMutation(
    ({ name, stockType, stockAmount }: MutableStakeholder) => addStakeholderFetch({ name, stockType, stockAmount }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.stakeholder); //stakeholder์ ๋ํ ์ฟผ๋ฆฌ ๋ฌดํจํ
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

#### โ Donut Chart

<details>
 <summary>์ฃผ์ฃผ ์ ๋ณด ์กฐํ ํ์ด์ง์ ์๋จ์ ์ฃผ์ฃผ๋ค์ ์ง๋ถ์จ์ ํํํ  ์ ์๋ ๋๋ ์ฐจํธ๋ฅผ ๋ ๋ํด์ฃผ์ธ์.</summary>

 - [react-google-charts](https://www.react-google-charts.com/) : ์ฌ๋ฌ ์ข๋ฅ์ ์ฐจํธ ๋ชจ์์ ์ ๊ณตํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ

 ```typescript
const DonutChart = () => {
  const { stakeholderlist } = useGetStakeholder();
  const { company } = useGetCompany();

  const data = useMemo(() => {
    const chartData: (string | number)[][] = [['Task', 'Hours per Day']];

    if (stakeholderlist?.data && company?.data) { // ๋ฐ์ดํฐ ์ ํจ ์
      const totalStockAmount = company.data.totalStockAmount; // ํ์ฌ ์ด ์ฃผ์ ๋ฐํ๋

      stakeholderlist?.data.map((s: Stakeholder) => {
        // ์ง๋ถ์จ =  ๋ณด์ ์๋ / ์ฃผ์ ์ด ๋ฐํ๋ * 100 
        chartData.push([s.name, (s.stockAmount / totalStockAmount) * 100]); // chartData์ ['์ด๋ฆ', ์ง๋ถ์จ] push
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

#### ๐ก Navbar

NavBar์ ๊ฒฝ์ฐ ์ง์  ํผ๊ทธ๋ง๋ฅผ ์ฐธ๊ณ ํ์ฌ ๊ตฌํํด๋ณด๊ณ  ์ถ์ด์ ์ง์  ์ปดํฌ๋ํธ๋ฅผ ์์ฑํ์์ต๋๋ค.
๐ [branch](https://github.com/pjh1011409/quotalab-codingtest/tree/2_feature/navbar/src/components/NavBar)  ํ์ธํ๊ธฐ!

#### ๐ก Load Spinner & Skeleton

์ฌ์ฉ์ ๊ฒฝํ์ ๊ฐ์ ์ํค๊ธฐ ์ํ์ฌ ์คํผ๋์ ์ค์ผ๋ ํค UI๋ฅผ ์์ฑํ์ฌ ์ถ๋ ฅํด๋ณด์์ต๋๋ค.
๐ [branch](https://github.com/pjh1011409/quotalab-codingtest/tree/8_feature/refactoring/src/components/LoadUI) ํ์ธํ๊ธฐ!

##  Project Architecture

```
โญ๏ธ src
|
โโโ ๐ _mocks
โ   โโโ ๐ handler.js
โ   โโโ ๐ worker.js
โ
โโโ ๐ components
โ   โ
โ   โโโ ๐ StakeholderAdd
โ   โ     โโโ ๐ index.tsx
โ   โ     โโโ ๐ AddForm.tsx
โ   โ     โโโ ๐ TopMenu.tsx
โ   โ
โ   โโโ ๐ StakeholderList
โ   โ     โโโ ๐ index.tsx
โ   โ     โโโ ๐ Table.tsx
โ   โ     โโโ ๐ TopMenu.tsx
โ   โ
โ   โโโ ๐ NavBar
โ   โ     โโโ ๐ index.tsx
โ   โ     โโโ ๐ ComapanySelect.tsx
โ   โ     โโโ ๐ QuotaHeader.tsx
โ   โ     โโโ ๐ Profile.tsx
โ   โ
โ   โโโ ๐ DonutChart
โ   โ     โโโ ๐ index.tsx
โ   โ
โ   โโโ  ๐ LoadUI
โ         โโโ ๐ LoadSpinner.tsx
โ         โโโ ๐ Skeleton.tsx
โ
โโโ ๐ hooks
โ     โโโ ๐ useGetStakeholder.ts
โ     โโโ ๐ useGetComapny.ts
โ     โโโ ๐ useAddStakeholder.ts
โ     โโโ ๐ useCustomToast.ts
โ     โโโ ๐ useInput.ts
โ   
โโโ ๐ layout - ๐ layout.tsx
โ
โโโ ๐ pages 
โ     โโโ  ๐ stakeholderListPage - ๐ index.tsx
โ     โโโ  ๐ stakeholderAddPage - ๐ index.tsx
โ
โโโ  ๐ App.tsx
โโโ  ๐ index.js
โโโ  ๐ queryClient.ts
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

|**์ฃผ์ฃผ ์ ๋ณด ํ์ด์ง** | **์ฃผ์ฃผ ์ถ๊ฐ ํ์ด์ง**  |
| :------: | :--------------: |
|<img width="1487" alt="แแฎแแฎแแฅแผแแฉแแฆแแตแแต" src="https://user-images.githubusercontent.com/81337674/221402932-47adba80-ad54-45ab-a2a2-48d58f4f8fdd.png">|<img width="1487" alt="แแฎแแฎแแฎแแกแแฆแแตแแต" src="https://user-images.githubusercontent.com/81337674/221402930-2161eaa8-b2a4-4932-9588-65089f906eee.png">  |
| **์ฃผ์ฃผ ์ถ๊ฐํ๊ธฐ** | **Spinner & Skeleton UI**|
|![แแฎแแฎแแฅแผแแฉแแฎแแก](https://user-images.githubusercontent.com/81337674/221402928-a78c26ad-9faf-43f4-b49c-7407f8509cd6.gif)|![แแฉแแตแผUI](https://user-images.githubusercontent.com/81337674/221402927-69e3090c-ec98-42c1-ab64-0190592cea71.gif) |


