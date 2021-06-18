const { getEvents } = require("libs/getEvents");
jest.setTimeout(60000);

test("should getEvents return data in a format", async () => {
    // expect.assertions(1);
    const result = await getEvents("2021-5-1", "2021-5-30"); // single day events
    // const result = await getEvents('2020-12-1', '2020-12-31'); //Multi-day events

    const _event = {
        id: expect.any(Number),
        status: expect.any(String),
        date: expect.any(String),
        date_utc: expect.any(String),
        url: expect.any(String),
        title: expect.any(String),
        image: expect.any(Object),
        start_date: expect.any(String),
        start_date_details: expect.any(Object),
        end_date: expect.any(String),
        end_date_details: expect.any(Object),
        timezone: expect.any(String),
    };
    for (const event of result) {
        expect(event).toMatchObject(_event);
    }
    // console.log(result);
});
