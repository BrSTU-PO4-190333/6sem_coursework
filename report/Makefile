docker-compose-script:
	cd /app/report

	latexmk -pdf -output-directory=/temp/ -jobname=KP.PO4.190333-05_81_00 main_coursework_1_pz.tex
	latexmk -pdf -output-directory=/temp/ -jobname=KP.PO4.190333-05_90_00__part1 main_coursework_3_0_a.tex
	latexmk -pdf -output-directory=/temp/ -jobname=KP.PO4.190333-05_90_00__part2 main_coursework_3_1_a.tex
	latexmk -pdf -output-directory=/temp/ -jobname=KP.PO4.190333-05_12_00 main_coursework_4_b.tex

	latexmk -pdf -output-directory=/temp/ -jobname=KP.PO4.190333-05_81_00.bundle main.tex

	cp /temp/*.pdf /build/
