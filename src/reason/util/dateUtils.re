[@gentype]
let monthNames = [|
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
|];

let getMonthString = (month: string): string =>
  switch (int_of_string(month)) {
  | num when num <= 12 && num >= 1 => monthNames[num - 1]
  | _ => "Invalid Month"
  };

let getDayString = (day: int): string => {
  let suffix =
    switch (day) {
    | 1
    | 21
    | 31 => "st"
    | 2
    | 22 => "nd"
    | 3
    | 23 => "rd"
    | _ => "th"
    };

  string_of_int(day) ++ suffix;
};
