/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

function getWeather(cityCode) {
    //
    myAxios({
        url: `http://hmajax.itheima.net/api/weather`,
        params: {
            city: cityCode
        }
    }).then(result => {
        console.log(result);
        const weatherCityObj = result.data
        const dateStr = `<span class="dateShort">${weatherCityObj.date}</span>
        <span class="calendar">农历 
          <span class="dateLunar">${weatherCityObj.dateLunar}</span>
        </span>`
        document.querySelector('.title').innerHTML = dateStr
        // 城市名字
        document.querySelector('.area').innerHTML = weatherCityObj.area

        const currentWeather = `
        <div class="tem-box">
        <span class="temp">
          <span class="temperature">${weatherCityObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${weatherCityObj.psPm25}</span>
          <span class="psPm25Level">${weatherCityObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${weatherCityObj.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${weatherCityObj.weather}</span>
          </li>
          <li class="windDirection">${weatherCityObj.windDirection}</li>
          <li class="windPower">${weatherCityObj.windPower}</li>
        </ul>
      </div>`
        document.querySelector('.weather-box').innerHTML = currentWeather

        const twObj = weatherCityObj.todayWeather
        const todayWStr = `div class="today-weather">
      <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${twObj.weather}</span>
          <span class="temNight">${twObj.temNight}</span>
          <span>-</span>
          <span class="temDay">${twObj.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${twObj.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${twObj.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${twObj.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${twObj.sunsetTime}</span>
        </li>
      </ul>
    </div>`
        document.querySelector('.today-weather').innerHTML = todayWStr


        // 7日天气预报数据展示
        const dayForecast = weatherCityObj.dayForecast
        const dayForecastStr = dayForecast.map(item => {
            return `<li class="item">
          <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src="${item.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">${item.windPower}</span>
          </div>
        </li>`
        }).join('')
        // console.log(dayForecastStr)
        document.querySelector('.week-wrap').innerHTML = dayForecastStr

    }).catch((error) => {
        console.log(error);
    })
}


getWeather('110100')

/**
 * 目标2：搜索城市列表
 *  2.1 绑定input事件，获取关键字
 *  2.2 获取展示城市列表数据
 */
// 2.1 绑定input事件，获取关键字

document.querySelector('.search-city').addEventListener('input', (e) => {

    const inputValue = e.target.value

    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: inputValue
        }
    })
        .then((result) => {
            //<ul class="search-list">
            // <li class="city-item">北京市</li>
            // </ul>
            console.log(result);
            const searchResult = result.data
            const searchResultStr = searchResult.map(item => {
                return `<li class="city-item" data-code = ${item.code}>${item.name}</li>`
            }).join('')
            document.querySelector('.search-list').innerHTML = searchResultStr
        }).catch((err) => {
            console.dir(err);
        });

})

/**
 * 目标3：切换城市天气
 *  3.1 绑定城市点击事件，获取城市code值
 *  3.2 调用获取并展示天气的函数
 */

document.querySelector('.search-list').addEventListener('click', (e) => {

    // if (e.target.classList.contains('city-item'))
    if (e.target.tagName === 'LI') {

        const areaCode = e.target.dataset.code
        console.log(areaCode);

        getWeather(areaCode)
    }
})


