const EnVivo = require("../models/enVivo");
const JsonUrlReader = require("./json_url_reader");
const Noticias = require("../models/noticias");
const Podcasts = require("../models/podcasts");
const Playlists = require("../models/playlist");
const VOD = require("../models/vod");

module.exports = {
  getData : async (url, objectClass) => {
    let currentDate = new Date().toLocaleString('es-MX', {timeZone : 'America/Mexico_City'});
    let jsonData;

    try {
      jsonData = await JsonUrlReader.perform(url);
    } catch (error) {
      return {date: currentDate, captureData: "Error in requests"};
    }

    if (objectClass instanceof EnVivo || objectClass instanceof Playlists) {
      return {date: currentDate, captureData: jsonData };
    }

    if (objectClass instanceof Podcasts) {
      let index = jsonData['data']
      for (let i = 0; i < index.length; i++) {
        let categoryData = index[i]["data"];
        for (let j = 0; j < categoryData.length; j++) {
          subCategoryData = categoryData[j]["data"];
          for (let k = 0; k < subCategoryData.length; k++) {
            let podcastUrl = subCategoryData[k]["url"];
            let podcastUrlData = await JsonUrlReader.perform(podcastUrl);
            subCategoryData[k]["url"] = podcastUrlData;
          }
        }
      }
      return {date: currentDate, captureData: jsonData };
    }

    if (objectClass instanceof VOD) {
      //featuredSections
      featuredSections = jsonData["featuredSuperAppVideoOnDemandSections"];
      for (let i = 0; i < featuredSections.length; i++) {
        let urlSection = featuredSections[i]["url"];
        let sectionData = await JsonUrlReader.perform(urlSection);
        //category
        categories = sectionData["superAppVideoOnDemandCategories"];
        for (let j = 0; j < categories.length; j++) {
          categoryUrl = categories[j]["url"];
          let categoryData = await JsonUrlReader.perform(categoryUrl);
          categories[j]["url"]= categoryData;
        }
        featuredSections[i]["url"] = sectionData;

      }
      //Sites
      sites = jsonData["superAppVideoOnDemandSites"];
      for (let i = 0; i < sites.length; i++) {
        let urlSection = sites[i]["url"];
        let sectionData = await JsonUrlReader.perform(urlSection);

        sections = sectionData["superAppVideoOnDemandSections"];
        for (let j = 0; j < sections.length; j++) {
          categoryUrl = sections[j]["url"];
          let urlCategoryData = await JsonUrlReader.perform(categoryUrl);
          video = urlCategoryData["superAppVideoOnDemandCategories"];

          for (let k = 0; k < video.length; k++) {
            let videoUrl = video[k]["url"];
            let videoData = await JsonUrlReader.perform(videoUrl);
            video[k]["url"]= videoData;
          }
          sections[j]["url"]= urlCategoryData;
        }
        sites[i]["url"] = sections;
      }

      return {date: currentDate, captureData: jsonData };
    }

    if (objectClass instanceof Noticias) {
      let index = jsonData['datos']
      for (let i = 0; i < index.length; i++) {
        let categoryUrl = index[i]["url"];
        let categoryData = await JsonUrlReader.perform(categoryUrl);
        index[i]["url"] = categoryData;
      }

      return {date: currentDate, captureData: jsonData };
    }
    return {date: currentDate, captureData: "No data" };
  }
}