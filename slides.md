---
background: livingroom.jpg
class: text-center
defaults:
  transition: slide-left
title: Tuning Android app performance for 150 MILLION devices
mdc: true
drawings:
  persist: false
---

# Tuning Android app performance for 150 MILLION devices

by Ryan Clements, Owner of Byte Bot

<!--
Thank you all for coming! Let me first tell you a story...
-->

---
layout: image
image: amazon-headquarters.webp
---

<!--
After a month or so of hard study and interview prep, I walked through the doors of Amazon in June of 2022. The team I joined was in the Fire TV department responsible for producing the News app. It was built using Android and before this job, the only experience I ever had in it was via side projects. That would quickly change.
-->

---
layout: image
image: news-tile.webp
---

<!--
The News app itself was stable and making a good chunk of change through advertisements. That being said.... there was something new being planned on the horizon and that’s what my team was going to ship.
-->

---
layout: image-right
image: news-app-on-tv.webp
---

# We wanted...

The same app, but genericized to other types of content like

<v-clicks>

<span><carbon-basketball class="opacity-60" /> Sports</span>

<span><carbon-video class="opacity-60" /> Trailers</span>

<span><carbon-apple class="opacity-60" /> Food</span>

<span><carbon-plane class="opacity-60" /> Travel</span>

<span>...</span>

</v-clicks>

<!--
We were pretty bullish with our plans. We wanted to take the business model of the News app, add enabled streaming, and genericize it for arbitrary genres, or channels as we called them. 
-->

---
layout: image
image: looking-up-cliff.jpg
---

<!--
With the task at hand, we were ready to build. And, build we did!
-->

---
layout: image
image: training-montage.gif
backgroundSize: contain
---

<!--
Over the next 8 months (soon to turn 11 😬) we scaffolded, prototyped, and iterated like crazy. Around the turn of the new year of 2023, we had enough of a prototype that people could start playing around with...
-->

---
layout: image
image: slow.gif
backgroundSize: contain
---

<!--
... and soon received reports of slow startup time. What happened next was the inspiration for this talk. Before I get to that though, I'd like to introduce the protagonist of the story...
-->

---
layout: image-right
image: headshot.JPEG
---

# Who is he?

<v-clicks>

## Ryan Clements

<span>Owner of <span class="text-yellow-300">Byte Bot</span></span>

<span class="text-gray-400">a software agency that helps teams ship full stack solutions to their users through <span class="text-yellow-300">training and consulting</span></span>

<div class="flex flex-col gap-2 mt-20">
  <div class="flex gap-2"><carbon-user op50 text-xl /><a href="https://ryanclements.dev" target="_blank" class="border-none! font-300">ryanclements.dev</a></div>
  <div class="flex gap-2"><carbon-logo-github op50 text-xl/><a href="https://github.com/ryanclementshax" target="_blank" class="border-none! font-300">ryanclementshax</a></div>
  <div class="flex gap-2"><carbon-logo-mastodon op50 text-xl /><a href="https://hachyderm.io/@ryanclementshax" target="_blank" class="border-none! font-300">ryanclementshax@hachyderm.io</a></div>
  <div class="flex gap-2"><carbon-logo-x op50 text-xl/><a href="https://twitter.com/ryanclementshax" target="_blank" class="border-none! font-300">ryanclementshax</a></div>
  <div class="flex gap-2"><carbon-logo-linkedin op50 text-xl/><a href="https://www.linkedin.com/in/ryan-clements-hax/" target="_blank" class="border-none! font-300">ryan-clements-hax</a></div>
</div>

</v-clicks>

<!--
I’m Ryan Clements, the owner of Byte Bot, a software development agency that aids software teams to ship top notch, production ready applications through consulting and trainings. I specialize in full stack development using Typescript, Nodejs, and C#. I also run a technical blog and am fairly active on social media. I’ll provide the links at the end of this talk for how we can connect.
-->

---
layout: center
---

# <span class="opacity-50">Lesson #1:</span> Control your (de)serialization

---
layout: center
---

<span class="text-red-500 text-5xl tracking-widest uppercase">😈 Reflection 😈</span>

---
layout: center
---

# <span class="opacity-50">Lesson #2:</span> Keep your dependencies up to date

---
layout: center
---

# Our poor app

<div class="flex flex-col gap-3 text-2xl">

<v-clicks>

  <div class="flex items-center gap-2">🥲 Kotlin 1.3</div>

  <div class="flex items-center gap-2">🤢 Android support libraries</div>

  <div class="flex items-center gap-2">🤮 Gradle 3<span v-click="4" class="-ml-2">.0</span></div>

</v-clicks>

</div>

---
layout: center
---

# Nice things we can't have

<div class="flex flex-col gap-3 text-2xl">

<v-clicks>

  <div class="flex items-center gap-2">❌ Flow</div>

  <div class="flex items-center gap-2">❌ androidx.anything (including compose 🥲)</div>

  <div class="flex items-center gap-2">❌ Anything that needs androidx</div>

  <div class="flex items-center gap-2">❌ Android Studio</div>

  <div class="flex items-center gap-2">⚠️ Databinding</div>

  <div class="flex items-center gap-2">⚠️ Documentation</div>

</v-clicks>

</div>

---
layout: center
---

# So what serializers can we use?

<div class="flex flex-col gap-3 text-2xl">

<v-clicks>

  <div class="flex items-center gap-2">❌ kotlinx.serialization</div>

  <div class="flex items-center gap-2">❌ Moshi</div>

  <div class="flex items-center gap-2">✅ Jackson</div>

</v-clicks>

</div>

---
layout: center
---

<span class="text-red-500 text-5xl tracking-widest uppercase">😈 Reflection 😈</span>

---
layout: center
---

```java
public class ItemSerializer extends StdSerializer<Item> {
    
    public ItemSerializer() {
        this(null);
    }
  
    public ItemSerializer(Class<Item> t) {
        super(t);
    }

    @Override
    public void serialize(
      Item value,
      JsonGenerator jgen,
      SerializerProvider provider
    ) throws IOException, JsonProcessingException {
        jgen.writeStartObject();
        jgen.writeNumberField("id", value.id);
        jgen.writeStringField("itemName", value.itemName);
        jgen.writeNumberField("owner", value.owner.id);
        jgen.writeEndObject();
    }
}
```

---
layout: center
---

```java {all|5}
Item myItem = new Item(1, "theItem", new User(2, "theUser"));
ObjectMapper mapper = new ObjectMapper();

SimpleModule module = new SimpleModule();
module.addSerializer(Item.class, new ItemSerializer());
mapper.registerModule(module);

String serialized = mapper.writeValueAsString(myItem);
```

---
layout: center
---

# <span class="opacity-50">Lesson #3:</span> Use profiling tooling

---
layout: center
---

<img src="android-performance-webpage.png"  class="h-100 rounded ma" alt="android performance webpage" />

---
layout: center
---

<img src="profiler-screenshot.png"  class="h-100 rounded ma" alt="screenshot of profiler" />

---
layout: center
---

# <span class="opacity-50">Lesson #4:</span> The startup path is sacred

---
layout: image
image: android-lifecycle-chart-simple.png
backgroundSize: contain
---

---
layout: image
image: android-lifecycle-chart.png
backgroundSize: contain
---

---
layout: center
---

```kotlin {all|2-7|10-15|16-17|18-21|22-24|25}
class MyApplication : Application() {
    // Initialize DI
    val taskRepository: TasksRepository
        get() = ServiceLocator.provideTasksRepository(this)
    val appComponent: AppComponent by lazy {
        DaggerAppComponent.factory().create(applicationContext)
    }
    override fun onCreate() {
        super.onCreate()
        // Initializing logging
        if (BuildConfig.DEBUG) {
          Timber.plant(DebugTree());
        } else {
          Timber.plant(CrashReportingTree());
        }
        // Inflating views
        setContentView(R.layout.main);
        // Registering broadcast receivers
        val filter = IntentFilter();
        intentFilter.addAction(packageName + "android.net.conn.CONNECTIVITY_CHANGE");
        registerReceiver(MyReceiver(), filter);
        // Kicking off initial tasks
        taskRepository.fetchInitialData();
        appComponent.scheduler.queueBackgroundTasks();
        // ... and so on ...
    }
}
```

---
---

# Beware of ContentProviders

ContentProviders run before other code during startup.

Look through your app's merged `AndroidManifest.xml` for lines like

```xml
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    android:exported="false"
    tools:node="merge">
    <!-- This entry makes ExampleLoggerInitializer discoverable. -->
    <meta-data android:name="com.example.ExampleLoggerInitializer"
          android:value="androidx.startup" />
</provider>
```

---
layout: center
---

```java {all|17}
// http://tinyurl.com/5n78k6cp
public class InitializationProvider extends ContentProvider {
    @Override
    public final boolean onCreate() {
        Context context = getContext();
        if (context != null) {
            // Many Initializer's expect the `applicationContext` to be non-null. This
            // typically happens when `android:sharedUid` is used. In such cases, we postpone
            // initialization altogether, and rely on lazy init.
            // More context: b/196959015
            Context applicationContext = context.getApplicationContext();
            if (applicationContext != null) {
                // Pass the class context so the right metadata can be read.
                // This is especially important in the context of apps that want to use
                // InitializationProvider in multiple processes.
                // b/183136596#comment18
                AppInitializer.getInstance(context).discoverAndInitialize(getClass());
            } else {
                StartupLogger.w("Deferring initialization because `applicationContext` is null.");
            }
        } else {
            throw new StartupException("Context cannot be null");
        }
        return true;
    }
    
    // ...
}
```

---
layout: center
---

# <span class="opacity-50">Lesson #5:</span> Define what <span class="italic">"fully loaded"</span> means

<div>
<span class="text-center" v-click><span class="text-red-500 text-xl opacity-100">Aggressively</span> defer everything else</span>
</div>

---
---

# 1000 foot view of the app

<v-clicks>

1. Create a separate app per genre ❌

2. Rewrite the existing app ❌

3. Create a new app that had its UI configured from the backend ✅

</v-clicks>

<v-clicks>

...but it has to be Trojan horse'd into the News app's apk... 🙃

<img
  class="w-50"
  src="thumbs-up.jpg"
  alt="" />

</v-clicks>

<!--
Before we get into performance optimizations, let’s zoom into the architecture of the app. Because we wanted to have the app be as generic as possible and make changes to the UI without having to do another OTA, a very expensive, time consuming process, we implemented a pattern called server driven UI or SDUI.

This is a pattern where the server sends down a description of the UI tree to create, and the app dumbly renders it; thereby allowing UI changes to be a server redeployment, not an app redeployment. Fun fact! We aren’t the only ones doing this, Airbnb is another company doing the same thing. Have you used Amazon Luna? They use it too, so this isn’t a new solution.

The reason why I bring this up is because to make this pattern practical, you need to introduce a cache on the app so it doesn’t need to refetch the UI definition every time it starts up. The workflow looks like this.

Instead of 20 apps each for a different genre, we would have one app we could deliver content to and add content to it declaratively by tweaking backend configuration, as opposed to the OTA route we took for the News app.
-->

---
---

# Behold! It's technically functional

Here is a rough architecture of the app.

Old parts in <span class="text-amber-700">orange</span>

New parts in <span class="text-green-600">green</span>

<v-click>

Ugly parts in <span class="text-red-400">red</span> <span class="text-2xl">🤫</span>

<Arrow x1="700" y1="300" x2="800" y2="300" class="z-10 text-red-500" />

</v-click>

<span class="absolute top-65 left-125 text-[200px] z-10" v-click>👋🏼</span>

![app architecture](app-architecture.png){.absolute.h-110.right-5.top-15.z-0}

<!--
Oh, and one more complication. We couldn’t create a new apk. We had to trojan horse the new app within the News app for a variety of reasons, the most important of which was it allowed us to deploy quicker and benefit from being preinstalled on devices.
-->

---
layout: image-left
image: playback-page.jpg
backgroundSize: contain
---

# Playback page

Fully loaded = first video frame rendered

<v-clicks>

1. Instantiate `NewsApplication`
1. Parse intent, determine experience to start
1. Start `FireChannelsActivity`
1. Instantiate minimal dependency graph
1. Fetch initial data
1. Determine the page to load
1. Inflate view and place the fragment
1. Load video player
1. <span class="text-green-500">Play video</span> <span v-click="10">👈🏼 <span class="opacity-50">// We need to get here</span></span>

</v-clicks>

---
layout: image-left
image: playback-page.jpg
backgroundSize: contain
---

# What were we actually doing?

<v-clicks>

1. Instantiate `NewsApplication`
1. <span class="text-red-500">Instantiate dependency graph <span class="italic"> for everything</span></span>
1. <span class="text-red-500">Start background processes <span class="italic"> for everything</span></span>
1. Parse intent, determine experience to start
1. Start `FireChannelsActivity`
1. Instantiate dependency graph <span class="italic text-red-500"> for everything</span>
1. Fetch initial data
1. <span class="text-red-500">Do cache maintenance</span>
1. Determine the page to load
1. Place the fragment
1. Load video player
1. <span class="text-green-500">Play video</span> <span v-click="10">👈🏼 <span class="opacity-50">// We need to get here</span></span>

</v-clicks>

---
layout: center
---

# <span class="opacity-50">Lesson #6:</span> Dependency injection
