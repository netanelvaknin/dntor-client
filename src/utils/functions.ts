export const translateDaysToEnglish = (daysArr: string[]) => {
    if (
        daysArr.includes("sunday") ||
        daysArr.includes("monday") ||
        daysArr.includes("tuesday") ||
        daysArr.includes("wednesday") ||
        daysArr.includes("thursday") ||
        daysArr.includes("friday") ||
        daysArr.includes("saturday")
    ) {
        return daysArr;
    }

    return daysArr.map((day: string) => {
        if (day === 'א') {
            return 'sunday';
        } else if (day === 'ב') {
            return 'monday';
        } else if (day === 'ג') {
            return 'tuesday';
        } else if (day === 'ד') {
            return 'wednesday';
        } else if (day === 'ה') {
            return 'thursday';
        } else if (day === 'ו') {
            return 'friday';
        } else if (day === 'ש') {
            return 'saturday';
        } else {
            return null;
        }
    });
};

export const translateDaysToHebrew = (daysArr: string[]) => {
    if (daysArr) {
        if (
            daysArr.includes("א") ||
            daysArr.includes("ב") ||
            daysArr.includes("ג") ||
            daysArr.includes("ד") ||
            daysArr.includes("ה") ||
            daysArr.includes("ו") ||
            daysArr.includes("ש")
        ) {
            return daysArr;
        }

        const daysNames: any = {
            sunday: "א",
            monday: "ב",
            tuesday: "ג",
            wednesday: "ד",
            thursday: "ה",
            friday: "ו",
            saturday: "ש",
        };

        return daysArr.map((day: string) => {
            return daysNames[day];
        });
    }

};