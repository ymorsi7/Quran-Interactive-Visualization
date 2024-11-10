d3.json("https://raw.githubusercontent.com/ymorsi7/Quran-Interactive-Visualization/main/TheQuranDataset.json")
    .then(data => {
        const nestedData = d3.groups(data.children, d => d.surah_name_en);
        const hierarchyData = {
            name: "Quran",
            children: nestedData.map(([surah, verses]) => ({
                name: surah,
                children: verses.map(verse => ({
                    ...verse,
                    value: +verse.no_of_word_ayah || 1
                }))
            }))
        };
        const root = d3.hierarchy(hierarchyData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        const width = 800;
        const height = 600;
        d3.treemap().size([width, height]).padding(1)(root);

        const svg = d3.select("#treemap").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(d3.zoom().on("zoom", (event) => {
                svg.attr("transform", event.transform);
            }))
            .append("g");

        const color = d3.scaleOrdinal()
            .domain(root.children.map(d => d.data.name))
            .range(d3.schemeCategory10);

        const notableVerses = [
            { surah: 'The Cow', ayah: 255, highlightColor: 'gold' },
            { surah: 'The Opening', ayah: 1, highlightColor: 'gold' },
            { surah: 'The Beneficent', ayah: 13, highlightColor: 'gold' },
            { surah: 'Joseph', ayah: 4, highlightColor: 'gold' }
        ];

        svg.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .style("fill", d => {
                const notableVerse = notableVerses.find(v =>
                    v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah
                );
                return notableVerse ? notableVerse.highlightColor : color(d.parent.data.name);
            })
            .style("stroke", d => {
                return d.data.surah_name_en && d.data.ayah_no_surah ? "#333" : "none";
            })
            .on("click", function(event, d) { displayDetails(d); });

            function displayDetails(d) {
                const details = d3.select("#verse-details");
                details.html("");
            
                if (d && d.data) {
                    console.log("Clicked Data:", d.data);
                    if (d.data.surah_name_en && d.data.ayah_en) {
                        const surahName = d.data.surah_name_en || "Unknown Surah";
                        const ayahText = d.data.ayah_en || "No translation available";
                        const ayahNo = d.data.ayah_no_surah || "No Ayah Number";
                        
                        details.append("h3").text(`${surahName} - Ayah ${ayahNo}`);
                        details.append("p").text(ayahText);
                    } else {
                        details.append("p").text("No data found for this specific verse in the dataset.");
                    }
                } else {
                    details.append("p").text("No data available for this verse.");
                    console.error("Data missing for clicked element:", d); 
                }
            }
            

        d3.select("#search-bar").on("input", function() {
            const keyword = this.value.toLowerCase();
            svg.selectAll("rect")
                .style("opacity", d => {
                    const text = (d.data.ayah_en || "").toLowerCase();
                    return text.includes(keyword) ? 1 : 0.2;
                })
                .style("stroke", d => {
                    const text = (d.data.ayah_en || "").toLowerCase();
                    return text.includes(keyword) ? "orange" : "#333";
                });
        });
    })
    .catch(error => console.error("Error loading JSON:", error));
