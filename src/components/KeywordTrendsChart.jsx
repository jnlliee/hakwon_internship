import { useEffect, useState } from 'react';
import {useRef } from 'react';

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
Legend,  ResponsiveContainer,
BarChart,
Bar,
CartesianGrid,
} from 'recharts';


const KeywordTrendsChart = () => {
  const [startDate, setStartDate] = useState('2025-07-22');
  const [endDate, setEndDate] = useState('2025-07-24');

  const [barData, setBarData] = useState([]);
  const [dailyData, setDailyData] = useState([]);



  const [keywordOpinions, setKeywordOpinions] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [keywordColorMap, setKeywordColorMap] = useState({});

const [worries, setWorries] = useState([]);
const [events, setEvents] = useState([]);

const [currentWorryPage, setCurrentWorryPage] = useState(1);
const [currentEventPage, setCurrentEventPage] = useState(1);

  const keywordSectionRef = useRef(null);
  const postSectionRef = useRef(null);
  const firstPostCardRef = useRef(null);
  const worrySectionRef = useRef(null);
const eventSectionRef = useRef(null);

const dayCount = dailyData.length;
let chartWidthPerDay;

if (dayCount === 2) {
    chartWidthPerDay = 300;
    } else if (dayCount === 2 || dayCount === 3) {
    chartWidthPerDay = 200;
    } else {
    chartWidthPerDay = 100;
    }

const chartWidth = dayCount * chartWidthPerDay;




  const colorPalette = [
    '#ff4b91', '#ffc107', '#00bfff', '#9ea9ff', '#00ff9f',
    '#e1a6d8', '#aaff00', '#ff6f61', '#40e0d0', '#ff1493',
  ];

  const [currentKeywordPage, setCurrentKeywordPage] = useState(1);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const paginatedKeywordOpinions = keywordOpinions.slice(
    (currentKeywordPage - 1) * ITEMS_PER_PAGE,
    currentKeywordPage * ITEMS_PER_PAGE
  );

  const paginatedPosts = popularPosts.slice(
    (currentPostPage - 1) * ITEMS_PER_PAGE,
    currentPostPage * ITEMS_PER_PAGE
  );

  const paginatedWorries = worries.slice(
  (currentWorryPage - 1) * ITEMS_PER_PAGE,
  currentWorryPage * ITEMS_PER_PAGE
);

const paginatedEvents = events.slice(
  (currentEventPage - 1) * ITEMS_PER_PAGE,
  currentEventPage * ITEMS_PER_PAGE
);




const renderPagination = (currentPage, totalItems, onPageChange, scrollToRef = null) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const pageButtons = [];

  for (let i = 1; i <= totalPages && i <= 5; i++) {
    const isActive = i === currentPage;

    pageButtons.push(
      <button
        key={i}
        style={{
          margin: '0 8px',
          padding: '6px 12px',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          borderBottom: `4px solid ${isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.3)'}`,
          fontWeight: isActive ? 'bold' : 'normal',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={() => {
          onPageChange(i);
          if (scrollToRef?.current) {
            setTimeout(() => {
              scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 0);
          }
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={{
      marginTop: '24px',
      borderBottom: '1px solid rgba(255,255,255,0.3)',
      paddingBottom: '6px',
      display: 'flex',
      justifyContent: 'center',
    }}>
      {pageButtons}
    </div>
  );
};


  // ✅ Place handleSearch here — AFTER all state/hooks, BEFORE return
  const handleSearch = async () => {
    if (!startDate || !endDate) return;

    try {
      const res = await fetch(
        `http://172.20.94.193:8080/api/v1/search/dashboard?startDate=${startDate}&endDate=${endDate}`
      );
      const result = await res.json();

      const bar = (result.searchedKeywordTotals || []).map((item) => ({
        keyword: item.keywordName,
        mentions: item.totalFrequency,
      }));
      setBarData(bar);

const summaries = result.searchedAllKeywords || [];

const allKeywords = [...new Set(summaries.map(k => k.keywordName))];

const dateSet = new Set(summaries.map(k => k.date));
const allDates = Array.from(dateSet).sort();

const keywordDateMap = {};

// Build keywordDateMap from flat structure
summaries.forEach(({ keywordName, date, frequency }) => {
  if (!keywordDateMap[keywordName]) {
    keywordDateMap[keywordName] = {};
  }
  keywordDateMap[keywordName][date] = frequency;
});

const dailyData = allDates.map(date => {
  const entry = { date };
  allKeywords.forEach(keyword => {
    entry[keyword] = keywordDateMap[keyword]?.[date] || 0;
  });
  return entry;
});


setDailyData(dailyData);


      const colorMap = {};
      allKeywords.forEach((keyword, idx) => {
        colorMap[keyword] = colorPalette[idx % colorPalette.length];
      });
      setKeywordColorMap(colorMap);

const trendingSummaries = (result.searchedTrendingKeywords || []).map((item) => ({
  keyword: item.keywordName,
  summary: item.periodSummary,
}));
setKeywordOpinions(trendingSummaries);




      const posts = (result.searchedPosts || []).map((post) => ({
        date: post.date,
        title: post.title,
        url: post.url,
        snippet: post.snippet,
      }));
      setPopularPosts(posts);

    const concernList = (result.searchedConcerns || []).map((item) => ({
    date: item.date,
    title: item.title,
    snippet: item.snippet,
    url: item.url,
    score: item.score,
    }));
    setWorries(concernList);

    const eventList = (result.searchedEvents || []).map((item) => ({
    date: item.date,
    title: item.title,
    url: item.url,
    }));
    setEvents(eventList);


    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    }
  };

return (
  <div style={styles.wrapper}>
    {/* ✅ Date picker row with 조회 button */}
    <div style={styles.datePickerRow}>
      <input
        type="date"
        style={styles.dateInput}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <span style={{ margin: '0 10px', color: 'white' }}>~</span>
      <input
        type="date"
        style={styles.dateInput}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleSearch} style={styles.searchButton}>
        조회
      </button>
    </div>

    {/* ✅ Bar Chart */}
    <div style={styles.section}>
      <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ minWidth: `${barData.length * 70}px`, height: '300px' }}>
          <BarChart width={barData.length * 70} height={300} data={barData}>
            <CartesianGrid stroke="#1f3b60" />
            <XAxis dataKey="keyword" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#ffffff' }} />
            <Bar dataKey="mentions" fill="#9ea9ff" barSize={50} />
          </BarChart>
        </div>
      </div>
    </div>

    {/* ✅ Line Chart */}
    <div style={styles.section}>
      <h3 style={styles.chartTitle}>키워드 언급량 추이</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ overflowX: 'auto' }}>
          <LineChart width={chartWidth} height={300} data={dailyData}>
            <CartesianGrid stroke="#1f3b60" />
            <XAxis dataKey="date" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#ffffff' }} />
            {Object.keys(dailyData[0] || {})
              .filter((k) => k !== 'date')
              .map((keyword) => (
                <Line
                  key={keyword}
                  type="monotone"
                  dataKey={keyword}
                  stroke={keywordColorMap[keyword]}
                  strokeWidth={2}
                  dot
                />
              ))}
          </LineChart>
        </div>
      </div>
    </div>

    {/* ✅ Keyword Summary */}
    <h3 style={{ color: 'white', fontSize: '20px', marginTop: '40px', marginBottom: '20px' }}>
      키워드 요약
    </h3>
    <div ref={keywordSectionRef}>
      {paginatedKeywordOpinions.map((item, index) => (
        <div key={index} style={styles.card}>
          <p><strong>키워드:</strong> {item.keyword}</p>
          <p><strong>키워드 의견:</strong> {item.summary}</p>
        </div>
      ))}
      {renderPagination(currentKeywordPage, keywordOpinions.length, (page) => {
        setCurrentKeywordPage(page);
        keywordSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      })}
    </div>

    {/* ✅ Popular Posts Summary */}
    <h3 style={{ color: 'white', fontSize: '20px', marginTop: '60px', marginBottom: '20px' }}>
      인기글 요약
    </h3>
    <div ref={postSectionRef} style={{ marginTop: '40px' }}>
      {paginatedPosts.map((post, index) => (
        <div key={index} style={styles.card}>
          <div style={{ fontWeight: 'bold', color: '#070707', marginBottom: '8px' }}>
            {post.date}
          </div>
          <p>
            <strong>이벤트명: </strong>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'lightblue', textDecoration: 'underline' }}
            >
              {post.title}
            </a>
          </p>
          <p><strong>요약:</strong> {post.snippet}</p>
        </div>
      ))}
      {renderPagination(currentPostPage, popularPosts.length, (page) => {
        setCurrentPostPage(page);
        postSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      })}
    </div>

    {/* ✅ Worry Summary */}
    <h3 style={{ color: 'white', fontSize: '20px', marginTop: '60px', marginBottom: '20px' }}>
      걱정거리 요약
    </h3>
    <div ref={worrySectionRef}>
      {paginatedWorries.length > 0 ? (
        paginatedWorries.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={{ fontWeight: 'bold', color: '#070707', marginBottom: '8px' }}>
              {item.date}
            </div>
            <p>
              <strong>제목: </strong>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'lightblue', textDecoration: 'underline' }}
              >
                {item.title}
              </a>
            </p>
            <p><strong>내용:</strong> {item.snippet}</p>
          </div>
        ))
      ) : (
        <p style={{ color: 'white' }}>데이터가 아직 없습니다.</p>
      )}
      {renderPagination(currentWorryPage, worries.length, setCurrentWorryPage)}
    </div>

    {/* ✅ Event Summary */}
    <h3 style={{ color: 'white', fontSize: '20px', marginTop: '60px', marginBottom: '20px' }}>
      이벤트 요약
    </h3>
    <div ref={eventSectionRef}>
      {paginatedEvents.length > 0 ? (
        paginatedEvents.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={{ fontWeight: 'bold', color: '#070707', marginBottom: '8px' }}>
              {item.date}
            </div>
            <p>
              <strong>이벤트명: </strong>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'lightblue', textDecoration: 'underline' }}
              >
                {item.title}
              </a>
            </p>
          </div>
        ))
      ) : (
        <p style={{ color: 'white' }}>데이터가 없습니다.</p>
      )}
      {renderPagination(currentEventPage, events.length, (page) => {
        setCurrentEventPage(page);
        eventSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      })}
    </div>
  </div>
);
};


const styles = {
    scrollWrapper: {
  overflowX: 'auto',
  backgroundColor: 'transparent',
  paddingBottom: '10px',
},
  wrapper: {
    padding: '40px',
    color: 'white',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  section: {
    width: '100%',
    maxWidth: '800px',
    marginBottom: '40px',
  },
  datePickerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  dateInput: {
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
  },
  dropdown: {
    backgroundColor: '#043873',
    color: 'white',
    border: '1px solid #ccc',
    padding: '6px 12px',
    borderRadius: '6px',
  },
  chartTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    textAlign: 'center',
  },
  card: {
    width: '90%',
    maxWidth: '700px',
    backgroundColor: 'white',
    color: '#000',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
};

export default KeywordTrendsChart;
