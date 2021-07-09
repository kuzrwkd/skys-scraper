# Logging UI

|                 | START | SUCCESS | FAILED | START CRAWLING | SUCCESS CRAWLING | FAILED CRAWLING | START DB I/0 | SUCCESS DB I/0 | FAILED DB I/0 | 
| :-------------- | :---: | :-----: | :----: | :------------: | :--------------: | :-------------: | :----------: | :------------: | :-----------: | 
| message         | ○    | ○      | ○     | ○             | ○               | ○              | ○           | ○             | ○            | 
| hostname        | ○    | ○      | ○     | ○             | ○               | ○              | ○           | ○             | ○            | 
| timestamp       | ○    | ○      | ○     | ○             | ○               | ○              | ○           | ○             | ○            | 
| type            | ○    | ○      | ○     | ○             | ○               | ○              | ○           | ○             | ○            | 
| level           | ○    | ○      | ○     | ○             | ○               | ○              | ○           | ○             | ○            | 
| endpoint        | ○    | ○      | ○     | -              | -                | -               | -            | -              | -             | 
| req_param       | ○    | -       | -      | -              | -                | -               | -            | -              | -             | 
| res_param       | -     | ○      | ○     | -              | -                | -               | -            | -              | -             | 
| status          | -     | ○      | ○     | -              | -                | -               | -            | -              | -             | 
| time            | -     | ○      | ○     | -              | ○               | ○              | -            | ○             | ○            | 
| crawling_url    | -     | -       | -      | ○             | ○               | ○              | -            | -              | -             | 
| crawling_result | -     | -       | -      | -              | ○               | ○              | -            | -              | -             | 
| query           | -     | -       | -      | -              | -                | -               | ○           | ○             | ○            | 
| query_result    | -     | -       | -      | -              | -                | -               | -            | ○             | ○            | 
| exception_class | -     | -       | ○     | -              | -                | ○              | -            | -              | ○            | 
| stacktrace      | -     | -       | ○     | -              | -                | ○              | -            | -              | ○            | 