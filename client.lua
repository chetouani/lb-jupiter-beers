local identifier = "jupiter-app"

while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

local function addApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = identifier, -- unique app identifier

        name = "Jupiter",
        description = "Application officielle du Jupiter, découvrez facilement notre catalogue de bières. Parcourez nos sélections, explorez les saveurs et trouvez la bière parfaite pour chaque occasion.",
        developer = "Jupiter Co.",
        

        defaultApp = false, --  set to true, the app will automatically be added to the player's phone
        size = 128, -- the app size in kb
        -- price = 0, -- OPTIONAL make players pay with in-game money to download the app

        -- ui = "http://localhost:5500/" .. GetCurrentResourceName() .. "/ui/index.html",
        ui = GetCurrentResourceName() .. "/ui/index.html",

        icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/assets/jupiter-icon.png",

        fixBlur = true -- set to true if you use em, rem etc instead of px in your css
    })

    if not added then
        print("Could not add app:", errorMessage)
    end
end

addApp()

AddEventHandler("onResourceStart", function(resource)
    if resource == "lb-phone" then
        addApp()
    end
end)