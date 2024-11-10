d3.json("TheQuranDataset.json").then(data => {
    const width = 800;
    const height = 600;

    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    const svg = d3.select("#treemap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    const g = svg.append("g");

    d3.treemap()
        .size([width, height])
        .padding(1)(root);

    const notableVerses = [
        { surah: 'The Cow', ayah: 255, highlightColor: 'gold' },
        { surah: 'The Cow', ayah: 285, highlightColor: 'gold' },
        { surah: 'The Cow', ayah: 286, highlightColor: 'gold' },
        { surah: 'The Opening', ayah: 1, highlightColor: 'gold' },
        { surah: 'The Sincerity', ayah: 1, highlightColor: 'gold' },
        { surah: 'The Sincerity', ayah: 2, highlightColor: 'gold' },
        { surah: 'The Sincerity', ayah: 3, highlightColor: 'gold' },
        { surah: 'The Sincerity', ayah: 4, highlightColor: 'gold' },
        { surah: 'The Dawn', ayah: 1, highlightColor: 'gold' },
        { surah: 'The Dawn', ayah: 5, highlightColor: 'gold' },
        { surah: 'The People', ayah: 1, highlightColor: 'gold' },
        { surah: 'The People', ayah: 6, highlightColor: 'gold' },
        { surah: 'Mary', ayah: 19, highlightColor: 'gold' },
        { surah: 'Mary', ayah: 23, highlightColor: 'gold' },
        { surah: 'Mary', ayah: 47, highlightColor: 'gold' },
        { surah: 'Mary', ayah: 96, highlightColor: 'gold' },
        { surah: 'Joseph', ayah: 4, highlightColor: 'gold' },
        { surah: 'Joseph', ayah: 18, highlightColor: 'gold' },
        { surah: 'Joseph', ayah: 87, highlightColor: 'gold' },
        { surah: 'Joseph', ayah: 92, highlightColor: 'gold' },
        { surah: 'The Beneficent', ayah: 13, highlightColor: 'gold' },
        { surah: 'The Beneficent', ayah: 46, highlightColor: 'gold' },
        { surah: 'The Beneficent', ayah: 76, highlightColor: 'gold' },
        { surah: 'The Sovereignty', ayah: 2, highlightColor: 'gold' },
        { surah: 'The Sovereignty', ayah: 13, highlightColor: 'gold' },
        { surah: 'The Light', ayah: 35, highlightColor: 'gold' },
        { surah: 'The Cave', ayah: 10, highlightColor: 'gold' },
        { surah: 'The Cave', ayah: 65, highlightColor: 'gold' },
        { surah: 'The Cave', ayah: 110, highlightColor: 'gold' },
        { surah: 'The Groups', ayah: 53, highlightColor: 'gold' },
        { surah: 'The Rooms', ayah: 13, highlightColor: 'gold' },
        { surah: 'The Human', ayah: 3, highlightColor: 'gold' },
        { surah: 'The Declining Day', ayah: 1, highlightColor: 'gold' },
        { surah: 'The Morning Hours', ayah: 3, highlightColor: 'gold' },
        { surah: 'The Relief', ayah: 5, highlightColor: 'gold' },
        { surah: 'The Exile', ayah: 22, highlightColor: 'gold' },
        { surah: 'The Clot', ayah: 1, highlightColor: 'gold' }
    ];

    g.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .style("fill", d => {
            const notableVerse = notableVerses.find(v =>
                v.surah === d.data.surah_name_en && +v.ayah === +d.data.ayah_no_surah
            );
            return notableVerse ? notableVerse.highlightColor : color(d.parent.data.name);
        })
        .style("stroke", "#333")
        .on("click", function(event, d) {
            displayDetails(d.data);
        });

    function displayDetails(data) {
        const details = d3.select("#verse-details");
        details.html("");
        if (data && data.surah_name_en && data.ayah_en) {
            const surahName = data.surah_name_en || "Unknown Surah";
            const ayahText = data.ayah_en || "No translation available";
            const ayahNo = data.ayah_no_surah || "No Ayah Number";
            details.append("h3").text(`${surahName} - Ayah ${ayahNo}`);
            details.append("p").text(ayahText);
        } else {
            details.append("p").text("No data available for this verse.");
        }
    }

    const searchBar = d3.select("#search-bar");
    searchBar.on("input", function() {
        const keyword = this.value.toLowerCase();
        svg.selectAll("rect")
            .style("opacity", d => {
                const text = (d.data.ayah_en || "").toLowerCase();
                return text.includes(keyword) ? 1 : 0.2;
            });
    });
});
