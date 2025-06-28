import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import devices from '../../utils/devices';
import styled from 'styled-components';
import { Overview } from '../../redux/statistics/typings';




  interface IOverview {
    overview: Overview | null;
  }

const LineGraph = ({overview}:IOverview) => {
  const questionCountByYear = overview && overview?.questionCountByYear;
  const months = Object.keys(questionCountByYear || {}).map((month) => ({
    month: month.toLowerCase().slice(0, 3),
    value: questionCountByYear && questionCountByYear[month],
  }));

  return (
    <Graphstyle>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={500}
          data={months}
          className='line-chart'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Graphstyle>
  );
};

const Graphstyle = styled.div`
background-color:white;
padding:0.5rem 0;
display:flex;
justify-content:center;
align-items:center;
width:100%;
height:300px;

border-radius:5px;
margin:-3px auto;
@media ${devices.tablet} {
 height:157px
}
@media ${devices.laptop} {
 height:128px
}
& .line-chart{
  right:14px
}
`
export default LineGraph;
