# My React Calendar

This project is created by Create-react-app, using TailwindCSS for styling, gulp for bundling files.

[Demo](https://yaowang908.github.io/my-react-calendar/)

```js
import Calendar from "my-react-calendar/src"

const events = [
        {
            allDay: true,
            start: `${year}-${month}-${day} 14:30:00`,
            end: `${year}-${month}-${day} 16:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: "2008-11-22 14:30:00",
            end: "2008-11-22 16:30:00",
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ];

const Calendar = () => (
    <Calendar events={events} use24Hour={false} enableTimezone={true} status={"SUCCEED"} onChange={onChange}}/>
)

const onChange = (target) => {
    /**
     *  target : {targetMonth: 5, targetYear: 2021}
     */
    // do something
}

// use24Hour: true, false

// enableTimezone: true, false, auto
// true: user can select timezone, false: disable timezone function, auto: only show client timezone without changing

// status only accept three code: ["SUCCEED", "FETCHING", "ERROR"];

// onChange accept function as argument, will be called when user switches month or year
```

### `yarn build`

`yarn build` also create a single HTML file to `single_html` that you can copy and paste.
