[18:23] Het Ashwinbhai Patel
## Object Model
 
Below is the object model for the ClimateCare platform, designed following Domain-Driven Design (DDD) principles. It outlines the entities, value objects, aggregates, and their relationships, focusing on entities like `User`, `Event`, `Post`, and their associated actions within the platform.
 
```mermaid
classDiagram
    class User {
        +UserID: String
        +Name: String
        +Location: String
        +Preferences: JSON
        +Role: String
    }
 
    class Admin {
        +AdminID: String
    }
    Admin --|> User : "inherits"
 
    class Event {
        +EventID: String
        +Name: String
        +Description: String
        +Location: String
        +Date: Date
        +OrganizerID: String
    }
    User "1" -- "many" Event : "organizes"
 
    class Post {
        +PostID: String
        +UserID: String
        +Title: String
        +Content: String
        +DatePosted: DateTime
    }
    User "1" -- "many" Post : "creates"
 
    class Comment {
        +CommentID: String
        +PostID: String
        +UserID: String
        +Content: String
        +DatePosted: DateTime
    }
    Post "1" -- "many" Comment : "has"
 
    class DiscussionThread {
        +ThreadID: String
        +PostID: String
        +Title: String
    }
    Post "1" -- "many" DiscussionThread : "has"
    User "1" -- "many" DiscussionThread : "creates"
 
    class Initiative {
        +InitiativeID: String
        +Name: String
        +Description: String
        +Type: String
        +Date: Date
        +Location: String
    }
    User "many" -- "many" Initiative : "participates in"
 
    class CarbonFootprintRecord {
        +RecordID: String
        +UserID: String
        +CarbonFootprint: Float
        +DateCalculated: DateTime
        +Suggestions: JSON
    }
    User "1" -- "many" CarbonFootprintRecord : "has"
 
    class Petition {
        +PetitionID: String
        +Title: String
        +Description: String
        +DateCreated: DateTime
        +OrganizerID: String
    }
    User "1" -- "many" Petition : "creates"
 
    class ResourceView {
        +ViewID: String
        +UserID: String
        +ResourceID: String
        +DateViewed: DateTime
    }
    User "1" -- "many" ResourceView : "views"
 
    class Resource {
        +ResourceID: String
        +Title: String
        +Type: String
        +Content: Text
        +DatePublished: DateTime
    }
 
    class Participation {
        +ParticipationID: String
        +EventID: String
        +UserID: String
        +DateParticipated: DateTime
    }
    Event "1" -- "many" Participation : "includes"
 
    class Volunteer {
        +VolunteerID: String
        +UserID: String
        +InitiativeID: String
        +DateVolunteered: DateTime
    }
    Initiative "1" -- "many" Volunteer : "includes"
 
```
 