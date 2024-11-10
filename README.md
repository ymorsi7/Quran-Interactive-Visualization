# Quranic Ayat Explorer

![Quranic Visualization Demo](demo.png)

A visual exploration tool for the Holy Quran using D3.js treemaps. This project lets you explore Quranic verses in an interactive and visually appealing way.

## Why I Built This

I wanted to create something that would let people see the entire Quran in a single, visually appealing view. I chose to use a treemap visualization because it's perfect for showing the hierarchical structure of the Quran - you can easily see how different Surahs (chapters) compare in size and explore individual verses within them.

Some key design choices I made:
- Each Surah has its own color to create clear visual separation
- Important verses are highlighted in gold for easy spotting
- Added zoom/pan features when I realized smaller verses were hard to click
- Included a search bar that greys out non-matching verses (try searching "love"!)
- Side panel shows the full verse when you click on any section

## Setup

1. Clone this repo
2. Make sure you have all these files:
```
index.html
script.js
TheQuranDataset.json
quran.png
smiling.png
```
3. Start a local server (I use Python's `python -m http.server 8000`)
4. Open `localhost:8000` in your browser

## How It Works

- The treemap shows all verses of the Quran
- Each rectangle represents a verse, grouped by chapter
- Gold highlights = notable verses
- Click any verse to see its details in the side panel
- Use the search bar to filter verses by keyword
- Scroll to zoom, drag to pan around

## Development Story

This was a solo project that took several iterations to get right. The biggest challenge was actually finding usable data - I spent about an hour wrestling with a Kaggle dataset that used pipes instead of commas before finding a better one.

The development process went something like this:

1. Data prep (~1 hour)
   - First attempt with pipe-separated data failed
   - Found and formatted a cleaner dataset

2. Basic visualization (~2 hours)
   - Got D3.js treemap working
   - Figured out how to map the data correctly
   - Added verse plotting

3. Making it look good (~30 min)
   - Added dark theme
   - Styled search bar and panels
   - Made sure everything was readable

4. Improvements (~1-2 hours)
   - Added search functionality
   - Fixed performance issues
   - Converted CSV to JSON for faster loading
   - Added zoom/pan for better interaction with small verses
   - Made borders thinner for cleaner look

The trickiest part was getting the data to play nice with the treemap. Once that was working, adding features like search was pretty straightforward.

## Made With

- D3.js v7
- Vanilla JavaScript
- A lot of trial and error with data formats
