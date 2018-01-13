import Link from 'next/link';
import styled from 'styled-components';
import { Input, Button, Table } from 'antd';
import Head from '../components/head';

const Search = styled(Input.Search)`
  width: 100%;
  max-width: 600px;
`;

const Viewport = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;

const GPSButton = styled(Button)`
  margin-left: 10px;
`;

const GitHub = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

const List = styled(Table)`
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
`;

const columns = [{
  title: '選區',
  dataIndex: 'name',
}, {
  title: '政黨',
  dataIndex: 'caucus',
}, {
  title: '立委',
  dataIndex: 'name',
}, {
  title: '表決',
  dataIndex: 'vote',
}];

const data = [{
  key: 1,
  area: '臺北市中正區',
  name: '全國不分區',
  caucus: '民主進步黨',
  name: '余宛如',
  vote: '贊成',
}];

export default () => (
  <div>
    <Head title="功德名錄：2018/01/10 立法院三讀通過《勞基法》修正草案" />

    <Viewport>
      <GitHub>
        <iframe src="https://ghbtns.com/github-btn.html?user=g0v&repo=merityuan&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
      </GitHub>
      <img alt="cover" width="575" src="./static/cover.png" />
      <SearchBar>
        <Search
          placeholder="請在這裡輸入郵遞區號"
          onSearch={value => console.log(value)}
          enterButton="搜尋"
          size="large"
        />
        <GPSButton type="primary" size="large">
          點我使用衛星定位
        </GPSButton>
      </SearchBar>
      <List columns={columns} dataSource={data} pagination={false} />
      <div>
        感謝名單
        <div>感謝 <a href="https://vote.ly.g0v.tw/" target="votely">立委投票指南</a> 提供表決資料</div>
        <div>感謝 <a href="https://k.olc.tw/elections/" target="elections">選舉黃頁</a> 提供立委名單</div>
      </div>
    </Viewport>
  </div>
)
