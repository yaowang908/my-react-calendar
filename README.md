# My React Calendar

This project is created by Create-react-app, using TailwindCSS for styling, gulp for bundling files.

[Demo](https://github.com/yaowang908)

```js
import { Calendar } from "my-react-calendar"

const events = [
        {
            start: `${year}-${month}-${day} 14:30:00`,
            end: `${year}-${month}-${day} 16:30:00`,
            // timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: "2008-11-22 14:30:00",
            end: "2008-11-22 16:30:00",
            // timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ];

const Calendar = () => (
    <Calendar events={events}/>
)
```

### `yarn build`

`yarn build` also create a single HTML file to `single_html` that you can copy and paste.
