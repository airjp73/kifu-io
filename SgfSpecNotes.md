#### Types

- Stone / Point - [aa] (a = 1, z = 26)
  - pass = [] or sometimes [tt] for boards <= 19x19
- Double - a number (e.g. GB[1] - good for black, GB[2] - very good for black)
- Simpletext - just some text?
- Text - Formatted text
- Real - Not quite sure
  - Number ["." Digit { Digit }]
- Inherit - Should persist for subtree

#### Go-specific properties

- HA - handicap
  - Generally should have AB (add black) if there is a handicap
- KM - kmoi
- TB - territory black (points must be unique)
- TW - territory white (points must be unique)

#### Moves should be executed even if technically illegal

##### We have to handle captures ourselves

- B - black move
- W - white move
- MN - specify move number
- KO - execute move even if it's illegal
  - must be accompanied by a move

#### Setup

##### Stone/points in list must be unique

- AB - add black - list of Stone
- AW - add white - list of Stone
- AE - erase - list of Point
- PL - whose turn it is to play

#### Node properties

- C - Comment text
- DM - Position is even - Double
- N - Name of the node - Simpletext
- V - Value of the node. - Real
  - Positive is good for black, negative good for white. Usually estimated score
- -- These below should not be mixed
- GB - Good for black - Double
- GW - Good for white - Double
- HO - node is a 'hotspot' (something is interesting) - Double
- UC - Position is unclear

#### Move annotation properties

- BM - Move is bad - Double
- DO - Move is doubtful
- IT - Move is interesting
- TE - Move is a tesuji

#### Markup Properties

- AR - arrow from first point to second point - Point:Point
- CR - Circle - list of Point
- DO - Dim/Grey out points - list of Point - Inherit
  - DD[] clears dim setting
- LB - Writes text on the board - Point:Simpletext
- LN - Draw line from one point to the other - Point:Point
- MA - Mark points with an X - list of Point
- SL - Selects points - list of Point
  - No mandated visual representation
- SQ - Marks with Square - list of Point
- TR - Marks with triangle - list of Point

#### Root Properties

- AP - Name nad version of application that created the sgf - Simpletext:Simpletext
  - Example: [CGoban:1.6.2]
- CA - Charset used for Simpletext and Text type
- FF - File format version
- GM - Defines game type
  - Go is GM[1] and other types should throw an error
- ST - Defines how variations are shown. - number
  - 0 - Variations of successor node with auto-markup
  - 1 - Variations of current node with auto-markup
  - 2 - Variations of successor node NO auto-markup
  - 3 - Variations of current node NO auto-markup
- SZ - Size of the board - number | number:number
  - SZ[19] = 19x19, SZ[10:5] = 10x5

#### Game info properties

- AN - Name of the person who made the annotations - Simpletext
- BR - Rank of black - Simpletext
- BT - Name of black team (if team match) - Simpletext
- CP - Copyright info for annotations - Simpletext
- DT - Date the game was played - YYYY-MM-DD
- EV - Name of event (e.g. tournament) - Simpletext
- GN - Name for the game - Simpletext
- GC - Some info about the game - Text
- ON - Info about opening (e.g. san-ren-sei) - Simpletext
- OT - Overtime method - Simpletext
- PB - Name of black player - Simpletext
- PC - Place game was played - Simpletext
- PW - Name of white player - Simpletext
- RE - Result - Simpletext
  - 0 = draw
  - B+4.5 / W+65 = winner + score
  - B+R / B+Resign = winner by resignation
  - B+T / B+Time = winner by time
  - B+F / B+Forfeit = winner by forfeit
  - Void = no result
  - ? = unknown result
- RO = Round number and type of round - Simpletext
  - RO[01 (playoff)]
- RU = Rules - Simpletext
  - AGA, GOE, Japanese, NZ
- TM - Time limits in secods - Real
- US - Name of user who entered the game - Simpletext
- WR - Rank of White
- WT - Name of white team

#### Timing Properties - times are in seconds

- BL - Time left for black after move was made - real
- OB - Number of black moves left to play in this byo-yomi period - number
- OW - White moves left (see OB)
- WL - time left for white (see BL)

#### Miscellaneous

- FG - Figures - can probably ignore
- PM - How move numbers should be printed
- VW - View only part of the board - elist of Point
  - Points that are visible
  - VW[] clears this
