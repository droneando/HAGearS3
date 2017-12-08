# HAGearS3
Home Assistant user interface for the Samsung Gear S3/S2 (tizen os)(Based on Jerrod Lankford work)

This is a fork of the Jerrod Lankford HAGearS3 source code, thank you so much Jerrod!!. Why?

Because home assistant can become very complicated after having configured it with the hardware and the taste of each person.
For me, import all entities of groups, lights, switches, covers, etc., was not enough, because everything was imported into the application, including the entities that home assistant automatically creates and that in most cases are not used in the web interface. Also import all the lights in the same place, all the switches in the same place, etc. I think it was not practical for later use in the application and it became very cumbersome may be.
That's why I decided to modify the application so that the logic of use was as similar as possible to the web interface, creating "rooms" in which to place lights, switches, groups, etc.
There is still a lot of work to do, because the application that I show you now, is adapted to my particular needs, but in the future I want it to be configurable for any user without having to modify the source code.

## Instructions
On the first run you need to add your server url and password in the settings page. After the welcome popup is closed, you will be transferred to the configuration page. The default url is set to http://192.168.1.165:8123 and password to none. Modify it at your own needs.
1. To actually type in configuration box you need to have disabled auto complete. On the S3 you can do this by going to 

```Settings > General Management > Input > Keyboard Settings > SmartTyping > Predictive Text | OFF```

2. enter your url with the protocl and all. https://myurl.org

3. Then enter your password carefully.

4. Hit save. It should go back to the main page and you should briefly see a loading spinner. Then your list of entities should work.

At the time of writing the following entities are supported:

```
Lights (on/off only, no dimming)
Switches
Covers (open/close only)
Scripts
Groups (on/off)
```
As I said before, for now, the application is adapted to my own needs. Now it is localized to the languages en-GB, en-US and es-ES. There are created 4 "rooms" called Living room, Dining room, Terrace and Water heaters. Within these "rooms" will be created the entities that I have configured for each of them. After a light, switch or whatever is switched on or off, the entitis will update automatically to show you the changes.

Logically this will only work correctly for my own Home Assistant server and it would be necessary to modify the source code to adapt it to the needs of each user. It is not complicated at all.

In the future this will not be necessary ... I hope!

## Screenshots
![Screenshot](screenshots/home_scree.png?raw=true)
![Screenshot](screenshots/setup_screen.png?raw=true)

![Screenshot](screenshots/dinning_room_screen.png?raw=true)
![Screenshot](screenshots/heaters_screen.png?raw=true)
