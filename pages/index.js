import Link from 'next/link';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import Head from '../components/head';

const Search = styled(Input.Search)`
  width: 100%;
  max-width: 600px;
`;

const Viewport = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GPSButton = styled(Button)`
  margin-left: 10px;
`;

export default () => (
  <div>
    <Head title="功德名錄：2018/01/10 立法院三讀通過《勞基法》修正草案" />

    <Viewport>
      <Search
        placeholder="請在這裡輸入郵遞區號"
        onSearch={value => console.log(value)}
        enterButton="搜尋"
        size="large"
      />
      <GPSButton type="primary" size="large">
        點我使用衛星定位
      </GPSButton>
    </Viewport>
  </div>
)
