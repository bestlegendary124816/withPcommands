const { Client, ChannelType, ApplicationFlagsBitField } = require("discord.js");
const DarkDashBoard = require("dbd-dark-dashboard");
const DBD = require("discord-dashboard");
const WelcomeDB = require("../../Schemas/Welcome");
const ChatbotDB = require("../../Schemas/Chatbot");
const LeaveDB = require("../../Schemas/remove");
module.exports = {
  name: "ready",
  once: "true",

  /**
   * @param { Client } client
   */

  async execute(client) {
    const { user } = client;

    client.config = require("../../config.json");
    await DBD.useLicense(client.config.DBD);
    DBD.Dashboard = DBD.UpdatedClass();

    const Dashboard = new DBD.Dashboard({
      port: 8000,
      client: {
        id: client.config.ID,
        secret: client.config.SEC,
      },
      redirectUri: "https://dashboard-mondistech.tk/discord/callback",
      domain: "https://dashboard-mondistech.tk",
      bot: client,
      supportServer: {
        slash: "/support",
        inviteUrl: "https://discord.gg/HpjkVAPSZD",
      },
      acceptPrivacyPolicy: true,
      minimizedConsoleLogs: false,
      guildAfterAuthorization: {
        use: true,
        guildId: "1035557363102527561",
      },
      invite: {
        clientId: "1028536734553739293",
        scopes: ["bot", "applications.commands"],
        permissions: "1110517509238",
        redirectUri: "https://discord.gg/HpjkVAPSZD",
      },
      theme: DarkDashBoard({
        information: {
          createdBy: "TechnologyPower",
          websiteTitle: "MonDisTech DashBoard",
          websiteName: "MonDisTech",
          websiteUrl: "https://dashboard-mondistech.tk",
          dashboardUrl: "https://dashboard-mondistech.tk",
          supporteMail: "technologypower24@gmail.com",
          supportServer: "https://discord.gg/HpjkVAPSZD",
          imageFavicon:
            "http://wonderanimation.us/css/imgs/robot_favicon_g8-r_black.png",
          iconURL:
            "https://cdn.dribbble.com/users/77598/screenshots/16399264/media/d86ceb1ad552398787fb76f343080aa6.gif",
          loggedIn: "Successfully signed you in",
          mainColor: "#2CA8FF",
          subColor: "#ebdbdb",
          preloader: "Loading..",
        },

        index: {
          card: {
            category: "MonDisTech V3.0",
            title: `Welcome to our Dashboard`,
            image: "https://top.gg/api/widget/1028536734553739293.svg",
            footer: "Your Freind",
          },

          information: {
            category: "Upcoming 1",
            title: "Audit Log Sytem",
            description: `Audit Logs system coming soon`,
            footer: "Coming Soon!",
          },
          feeds: {
            category: "Upcoming 2",
            title: "Automod System",
            description: `Automod Coming soon, with anti nuke system, Block Mention Spam, Account Age Checker, Block Spam Content, Flagged Words, Better than discord automod`,
            footer: "Comming Soon!",
          },
        },

        commands: [
          {
            category: `Starting Up`,
            subTitle: `All helpful commands`,
            list: [
              {
                commandName: "Ban",
                commandUsage: `/Ban <target> <reason>`,
                commandDescription: `Bans the member from the server and`,
                commandAlias: "None",
              },
              {
                commandName: "help",
                commandUsage: "/help",
                commandDescription: "Send the help menu",
                commandAlias: "None",
              },
              {
                commandName: "anime",
                commandUsage: "/anime <query>",
                commandDescription: "Gives Information about that anime",
                commandAlias: "None",
              },
              {
                commandName: "Invite the bot",
                commandUsage:
                  "To get more information about commands invite the bot",
                commandDescription: "Invite",
                commandAlias: "None",
              },
            ],
          },
        ],
      }),
      settings: [
        //Welcome System

        {
          categoryId: "welcome",
          categoryName: "Welcome System",
          categoryDescription: "Setup the Welcome Channel",
          categoryOptionsList: [
            {
              optionId: "welch",
              optionName: "Welcome Channel",
              optionDescription: "Set or Reset the server's welcome channel",
              optionType: DBD.formTypes.channelsSelect(
                false,
                (channelTypes = [ChannelType.GuildText])
              ),
              getActualSet: async ({ guild }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {
                    if (data) return data.Channel;
                    else return null;
                  }
                );
              },
              setNew: async ({ guild, newData }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {}
                );
                if (!newData) {
                  newData = null;
                }
                if (!data) {
                  data = WelcomeDB.create({
                    Guild: guild.id,
                    Channel: newData,
                    DM: false,
                    DMMessage: null,
                    Content: false,
                    Embed: false,
                  });
                  await data.save();
                } else {
                  data.Channel = newData;
                  await data.save();
                }
                return;
              },
            },
            {
              optionId: "weldm",
              optionName: "Welcome DM",
              optionDescription: "Enable or Disable Welcome Message (IN DM)",
              optionType: DBD.formTypes.switch(false),
              getActualSet: async ({ guild }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {
                    if (data) return data.DM;
                    else return false;
                  }
                );
              },
              setNew: async ({ guild, newData }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {}
                );
                if (!newData) {
                  newData = false;
                }
                if (!data) {
                  data = WelcomeDB.create({
                    Guild: guild.id,
                    Channel: null,
                    DM: newData,
                    DMMessage: null,
                    Content: false,
                    Embed: false,
                  });
                  await data.save();
                } else {
                  data.DM = newData;
                  await data.save();
                }
                return;
              },
            },
            {
              optionId: "weldmopt",
              optionName: "Welcome DM Options",
              optionDescription: "Send Content",
              optionType: DBD.formTypes.switch(false),
              themeOptions: {
                minimalbutton: {
                  first: true,
                },
              },
              getActualSet: async ({ guild }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {
                    if (data) return data.Content;
                    else return false;
                  }
                );
              },
              setNew: async ({ guild, newData }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {}
                );
                if (!newData) {
                  newData = false;
                }
                if (!data) {
                  data = WelcomeDB.create({
                    Guild: guild.id,
                    Channel: null,
                    DM: false,
                    DMMessage: null,
                    Content: newData,
                    Embed: false,
                  });
                  await data.save();
                } else {
                  data.Content = newData;
                  await data.save();
                }
                return;
              },
            },

            {
              optionId: "welcembed",
              optionName: "",
              optionDescription: "Send Embed",
              optionType: DBD.formTypes.switch(false),
              themeOptions: {
                minimalbutton: {
                  last: true,
                },
              },
              getActualSet: async ({ guild }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {
                    if (data) return data.Embed;
                    else return false;
                  }
                );
              },
              setNew: async ({ guild, newData }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {}
                );
                if (!newData) {
                  newData = false;
                }
                if (!data) {
                  data = WelcomeDB.create({
                    Guild: guild.id,
                    Channel: null,
                    DM: false,
                    DMMessage: null,
                    Content: false,
                    Embed: newData,
                  });
                  await data.save();
                } else {
                  data.Embed = newData;
                  await data.save();
                }
                return;
              },
            },
            {
              optionId: "weldmmsg",
              optionName: "Welcome Message (IN DM)",
              optionDescription: "Send a DM to a newly joined member",
              optionType: DBD.formTypes.embedBuilder({
                username: user.username,
                avatarURL: user.avatarURL(),
                defaultJson: {
                  content: "Welcome",
                  embed: {
                    description:
                      "Don't forget to read the rules and follow them",
                  },
                },
              }),
              getActualSet: async ({ guild }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {
                    if (data) return data.DMMessage;
                    else return null;
                  }
                );
              },
              setNew: async ({ guild, newData }) => {
                let data = await WelcomeDB.findOne({ Guild: guild.id }).catch(
                  (err) => {}
                );
                if (!newData) {
                  newData = null;
                }
                if (!data) {
                  data = WelcomeDB.create({
                    Guild: guild.id,
                    Channel: null,
                    DM: false,
                    DMMessage: newData,
                    Content: false,
                    Embed: false,
                  });
                  await data.save();
                } else {
                  data.DMMessage = newData;
                  await data.save();
                }
                return;
              },
            },
          ],
        },
        //chatbot system
        {
          categoryId: "ai",
          categoryName: "Chatbot",
          categoryDescription: "Chatbot Sytem",
          categoryOptionsList: [
            {
              optionId: "aich",
              optionName: "Chatbot Channel",
              optionDescription: "Set or Reset the server's Chatbot channel",
              optionType: DBD.formTypes.channelsSelect(
                false,
                (channelTypes = [ChannelType.GuildText])
              ),
              getActualSet: async ({ guild }) => {
                let data = await ChatbotDB.findOne({ Guild: guild.id }).catch(
                  (err) => {
                    if (data) return data.Channel;
                    else return null;
                  }
                );
              },
              setNew: async ({ guild, newData }) => {
                let data = await ChatbotDB.findOne({ Guild: guild.id }).catch(
                  (err) => {}
                );
                if (!newData) {
                  newData = null;
                }
                if (!data) {
                  data = ChatbotDB.create({
                    Guild: guild.id,
                    Channel: newData,
                  });
                } else {
                  data.Channel = newData;
                }
                return;
              },
            },
          ],
        },
        //Leave System
        {
          categoryId: "leave",
          categoryName: "Leave System",
          categoryDescription: "Setup the Leave Channel",
          categoryOptionsList: [
            {
              optionId: "lvch",
              optionName: "Leave Channel",
              optionDescription: "Set or Reset the server's Leave channel",
              optionType: DBD.formTypes.channelsSelect(
                false,
                (channelTypes = [ChannelType.GuildText])
              ),
              getActualSet: async ({ guild }) => {
                let data = await LeaveDB.findOne({ Guild: guild.id }).catch(
                  (err) => {
                    if (data) return data.Channel;
                    else return null;
                  }
                );
              },
              setNew: async ({ guild, newData }) => {
                let data = await LeaveDB.findOne({ Guild: guild.id }).catch(
                  (err) => {}
                );
                if (!newData) {
                  newData = null;
                }
                if (!data) {
                  data = LeaveDB.create({
                    Guild: guild.id,
                    Channel: newData,
                  });
                } else {
                  data.Channel = newData;
                }
                return;
              },
            },
          ],
        },
      ],
    });

    Dashboard.init();
  },
};
