# English Classroom Hub – description of personal data processing / Opis obdelave osebnih podatkov

Draft for the school's data-protection officer (DPO). It describes what the tool does, so the school can decide whether and under which conditions pupils may use it. It contains no personal data. / Osnutek za pooblaščeno osebo za varstvo podatkov (DPO). Opisuje delovanje orodja, da šola presodi, ali in pod kakšnimi pogoji ga učenci lahko uporabljajo. Ne vsebuje osebnih podatkov.

---

## English

**Purpose.** Pupils (grades 6–9) practise English vocabulary and grammar online. The teacher sees how much and how well each pupil practised, to plan lessons and give feedback.

**Is signing in required?** No. Pupils can practise without signing in; then nothing is saved. Results are saved only if the pupil signs in with their school Google account.

**Data saved for each finished activity**
- school e-mail address, first name and surname (taken from the school Google account)
- date and time, school year
- exercise (coursebook, topic, activity) and score
- the pupil's class (looked up in a class list kept by the teacher; see below)

**Not collected:** passwords, photos, phone numbers, addresses, location, free-text answers, advertising or analytics cookies.

**Where the data is.** One private Google Sheet in the teacher's school Google Workspace account (domain os-verzej.si). It is not shared with anyone else. The class list (pupil name, school year, class; imported from the school register) is a tab in the same Sheet. Sign-in is limited to the school domain; the server rejects accounts from other domains.

**Where the data is NOT.** The web pages and exercise code are hosted on WordPress at Arnes Splet and on GitHub Pages. They contain no pupil data. The class list and results are never published in the public code repository.

**Processing.** Google (school Workspace) provides sign-in and the spreadsheet. A small script in the teacher's Google account checks the Google sign-in token and writes one row per result. Nothing is sent to other services.

**Access.** Only the teacher (spreadsheet owner). Teacher pages on the website are private (visible only to the teacher's account).

**Retention.** Results are kept while they are useful for teaching. The teacher can delete all results older than a chosen number of years with one menu command, and can delete a pupil's rows on request. Proposed rule (to be decided by the school): results are deleted [N] years after the pupil leaves the school or when the pupil graduates from grade 9.

**Legal basis, information to parents, retention period, and whether consent is needed:** to be decided by the school / DPO.

**Questions for the DPO**
1. Is storing name, school e-mail, class and score in a private teacher Sheet acceptable? Under which basis?
2. How and when are parents/pupils informed?
3. What retention period applies?
4. May the teacher use the school Workspace Sheet for this, or should the data be kept elsewhere?

---

## Slovenščina

**Namen.** Učenci (6.–9. razred) vadijo angleško besedišče in slovnico na spletu. Učitelj vidi, koliko in kako uspešno je posamezen učenec vadil, da lahko načrtuje pouk in daje povratne informacije.

**Ali je prijava obvezna?** Ne. Učenci lahko vadijo brez prijave; takrat se nič ne shrani. Rezultati se shranijo samo, če se učenec prijavi s šolskim Google računom.

**Podatki, ki se shranijo ob vsaki končani vaji**
- šolski e-naslov, ime in priimek (iz šolskega Google računa)
- datum in ura, šolsko leto
- vaja (učbenik, tema, dejavnost) in rezultat
- razred učenca (poiščemo ga v seznamu razredov, ki ga vodi učitelj; glej spodaj)

**Ne zbiramo:** gesel, fotografij, telefonskih številk, naslovov, lokacije, prostih besedilnih odgovorov, oglaševalskih ali analitičnih piškotkov.

**Kje so podatki.** V eni zasebni Google preglednici v učiteljevem šolskem Google Workspace računu (domena os-verzej.si). Z nikomer ni deljena. Seznam razredov (ime učenca, šolsko leto, razred; uvožen iz šolske evidence) je zavihek v isti preglednici. Prijava je omejena na šolsko domeno; strežnik zavrne račune z drugih domen.

**Kje podatkov NI.** Spletne strani in koda vaj so na WordPressu pri Arnes Splet in na GitHub Pages. Ne vsebujejo podatkov o učencih. Seznam razredov in rezultati se nikoli ne objavijo v javnem repozitoriju kode.

**Obdelava.** Google (šolski Workspace) zagotavlja prijavo in preglednico. Majhna skripta v učiteljevem Google računu preveri Google prijavni žeton in zapiše eno vrstico na rezultat. Nič se ne pošilja drugim storitvam.

**Dostop.** Samo učitelj (lastnik preglednice). Učiteljske strani na spletišču so zasebne (vidne le učiteljevemu računu).

**Hramba.** Rezultati se hranijo, dokler so uporabni pri pouku. Učitelj lahko z enim ukazom v meniju izbriše vse rezultate, starejše od izbranega števila let, in na zahtevo izbriše vrstice posameznega učenca. Predlagano pravilo (odloči šola): rezultati se izbrišejo [N] let po odhodu učenca iz šole oziroma po zaključku 9. razreda.

**Pravna podlaga, obveščanje staršev, rok hrambe in morebitno soglasje:** določi šola / pooblaščena oseba.

**Vprašanja za pooblaščeno osebo**
1. Ali je shranjevanje imena, šolskega e-naslova, razreda in rezultata v zasebni učiteljevi preglednici sprejemljivo? Na kateri podlagi?
2. Kako in kdaj se obvestijo starši oziroma učenci?
3. Kakšen rok hrambe velja?
4. Ali sme učitelj za to uporabljati preglednico v šolskem Workspace računu ali je treba podatke hraniti drugje?
