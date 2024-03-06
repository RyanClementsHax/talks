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

<div><span class="opacity-70">by Ryan Clements, Owner of </span><span class="text-yellow-400">Byte Bot</span> 🤖</div>

<!--
Thank you all for coming! Let me first tell you a story...
-->

---
layout: image
image: amazon-headquarters.webp
---

<!--
After a month or so of hard study and interview prep, I walked through the doors of Amazon in June of 2022. The team I joined was in the Fire TV department responsible for producing the News app. It was built using Android and before this job, the only experience I ever had in it was via side projects. That would quickly change.

- Amazon in June 2022
- Joined FireTV department, specifically News app team
- It was built in Android
- Only had experience with Android in side projects
-->

---
layout: image
image: news-tile.webp
---

<!--
The News app itself was stable and making a good chunk of change through advertisements.
-->

---
layout: image
image: firetv-news.jpg
---

<!--
That being said.... there was something new being planned on the horizon and that’s what my team was going to ship.

- Stable
- Making money
- New, exciting thing on horizon
- That's what I was going to help with
-->

---
layout: image-right
image: initial-browse-page.png
backgroundSize: contain
---

# We wanted...

The same app, but genericized to other types of content like

<v-clicks>

<span>🏀 Sports</span>

<span>🎞️ Trailers</span>

<span>🍕 Food</span>

<span>✈️ Travel</span>

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

- Slow startup times upwards of 40 seconds! The bar was 2 seconds.....
-->

---
layout: image-right
image: headshot.JPEG
---

# Who am I?

<v-clicks>

<div>Ryan Clements, Owner of <span class="text-yellow-400">Byte Bot</span> 🤖</div>

<span class="opacity-80">a software agency that helps teams ship full stack solutions to their users through</span> <span class="text-yellow-400">training and consulting</span> 🚀

<div class="flex gap-2">
  <img src="tech-logos/react-logo.svg" alt="react" class="logo" />
  <img src="tech-logos/nextjs-logo.svg" alt="nextjs" class="logo" />
  <img src="tech-logos/vue-logo.svg" alt="vue" class="logo" />
  <img src="tech-logos/nuxt-logo.svg" alt="nuxt" class="logo" />
  <img src="tech-logos/typescript-logo.svg" alt="typescript" class="logo" />
  <img src="tech-logos/javascript-logo.svg" alt="javascript" class="logo" />
</div>

<div class="flex gap-2 mt-2">
  <img src="tech-logos/node-logo.svg" alt="node" class="logo" />
  <img src="tech-logos/deno-logo.svg" alt="deno" class="logo" />
  <img src="tech-logos/csharp-logo.svg" alt="csharp" class="logo" />
  <img src="tech-logos/aspnet-core-logo.svg" alt="aspnet core" class="logo" />
  <img src="tech-logos/postgres-logo.svg" alt="postgres" class="logo" />
</div>

<div class="flex gap-2 mt-2">
  <img src="tech-logos/aws-logo.svg" alt="aws" class="logo" />
  <img src="tech-logos/azure-logo.svg" alt="azure" class="logo" />
</div>

<div class="flex flex-col gap-2 mt-5">

<div>📲 calendly.com/byte-bot</div>
<div>📧 info@bytebot.io</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>
<div>🔗 linkedin.com/in/ryan-clements-hax</div>

</div>

</v-clicks>

<!--
I’m Ryan Clements, the owner of Byte Bot, a software development agency that aids software teams to ship full stack solutions through consulting and trainings. I specialize in full stack development using Typescript, Nodejs, and C#. I also run a technical blog and am fairly active on social media. I’ll provide the links at the end of this talk for how we can connect.

- One of the things we do is help backend developers with the frontends that frustrate them!

- Owner of Byte Bot
- I help software teams ship full stack solutions using Typescript, Node.js, and C#, through consulting and training
- I run a technical blog
- I'm active on social media
- I'll provide links at the end of this talk too
-->

---
layout: center
---

# Our first findings were....low tech

<!--
Our team, didn’t have a whole lot of Android or performance debugging experience, so we were flying by the seat of our pants here. We weren’t aware of any readily available tools so for our first iteration we used simple timer logs.

We placed these around key points in the workflow to figure out where the bottleneck was. This proved surprisingly effective as it quickly revealed where our first bottleneck was - serialization.

- We placed timer logs
- Found the first bottle neck
-->

---
layout: center
---

# <span class="tag">Lesson #1:</span> Control your (de)serialization

<!--
We were using Jackson for all of our serialization and deserialization. Given our backend was in Java, this meant we could share DTO/(de)ser code between the client and server.

But, but, but, ...

- We used Jackson for all of our serialization
- Allowed us to share DTOs and (de)ser logic
-->

---
layout: center
---

<span class="scary">😈 Reflection 😈</span>

<!--
Jackson works just fine on the server, but in a constrained environment where the code is running on a device that is THIS SMALL, the reflection based (de)ser logic was killing us. Our solution was to hand write the logic ourselves to avoid this code path. Doing this saved us at least 50% of startup costs.

- It led us to reflection problems
-->

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

<!--
At this point the performance work was handed off to me and I wasn’t about to be defeated. I was determined to get the startup time within tolerance in time for the launch. Our problems weren’t new and there wasn’t anything special that this app did, so I turned to the wisdom of the internet on techniques other people turned to.

- Work was handed to me
- I needed to get startup time within tolerance for launch
- I turned to the internet for wisdom
-->

---
layout: center
---

<span class="title large">50%!</span>

---
layout: center
---

# <span class="tag">Lesson #2:</span> Keep your dependencies up to date

<!--
Some of you are on the edge of your seat waiting to slam dunk on an Amazon engineer about code generating (de)ser libraries. Oh! We know about those which leads me to a big constraint

Well that app’s dependencies were circa 2017-2019 and hadn’t been upgraded since. We were still on gradle 3.0 for example. Many of the libraries either a) didn’t work with our dependencies or b) didn’t work with Amazon’s custom build system (another story). Alas, we had to move forward with what we had.

- You're at the edge of your seat
- Our app was vacuum sealed in 2017-2019 (up to 5yo)
- Not everything worked in Amazon
-->
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
Before we get into more performance optimizations, let’s zoom into the architecture of the app. Because we wanted to have the app be as generic as possible and make changes to the UI without having to do another OTA, a very expensive, time consuming process, we implemented a pattern called server driven UI or SDUI.

This is a pattern where the server sends down a description of the UI tree to create, and the app dumbly renders it; thereby allowing UI changes to be a server redeployment, not an app redeployment. Fun fact! We aren’t the only ones doing this, Airbnb is another company doing the same thing. Have you used Amazon Luna? They use it too, so this isn’t a new solution.

The reason why I bring this up is because to make this pattern practical, you need to introduce a cache on the app so it doesn’t need to refetch the UI definition every time it starts up. The workflow looks like this.

Instead of 20 apps each for a different genre, we would have one app we could deliver content to and add content to it declaratively by tweaking backend configuration, as opposed to the OTA route we took for the News app.

- We can do this because we own the App Store
-->

---
---

# Behold! It's technically functional

Here is a rough architecture of the app.

Old parts in <span class="text-amber-700">orange</span>

New parts in <span class="text-green-600">green</span>

<v-click>

Ugly parts in <span class="text-red-400">red</span> <span class="text-xl">🤫</span>

<Arrow x1="700" y1="300" x2="800" y2="300" class="z-10 text-red-500" />

</v-click>

<span class="absolute top-65 left-125 text-[200px] z-10" v-click>👋🏼</span>

![app architecture](app-architecture.png){.absolute.h-110.right-5.top-15.z-0}

<!--
Oh, and one more complication. We couldn’t create a new apk. We had to trojan horse the new app within the News app for a variety of reasons, the most important of which was it allowed us to deploy quicker and benefit from being preinstalled on devices.
-->

---
layout: center
---

# Our poor app

<div class="list">

<v-clicks>

  <div>🥲 Kotlin 1.3</div>
  <div>🤢 Android support libraries</div>
  <div>🤮 Gradle 3<span v-click="4">.0</span></div>

</v-clicks>

</div>

---
layout: center
---

# Nice things we can't have

<div class="list">

<v-clicks>

  <div>❌ Flow</div>
  <div>❌ androidx.anything (including compose 🥲)</div>
  <div>❌ Anything that needs androidx</div>
  <div>❌ Android Studio</div>
  <div>⚠️ Databinding</div>
  <div>⚠️ Documentation</div>

</v-clicks>

</div>

---
layout: center
---

# So what serializers can we use?

<div class="list">

<v-clicks>

  <div>❌ kotlinx.serialization</div>
  <div>❌ Moshi</div>
  <div>✅ Jackson</div>

</v-clicks>

</div>

---
layout: center
---

<span class="scary">😈 Reflection 😈</span>

---
layout: center
---

# <span class="tag">Lesson #3:</span> Use profiling tooling

---
layout: center
---

<img src="android-performance-webpage.png"  class="focus" alt="android performance webpage" />

<!--
I’ve always been impressed with the quality of Android’s documentation and their section on performance met those expectations. I found there are two major tools to profile performance. The first of which is the profiler integrated into Android Studio. The second of which is a systrace + Perfetto combo.

- Android documentation is good
- Profiling tooling is good
- Profiling in Android Studio
- systrace + Perfetto
-->

---
layout: center
---

<img src="profiler-screenshot.png"  class="focus" alt="screenshot of profiler" />

<!--
The main difference between the two is Android Studio has an app specific focus whereas systrace provides a system level view. The latter is a great tool, but I found all of our problems could be diagnosed with the former so I’ll only discuss that in this talk.

- Android has an "app specific" focus
-->

---
layout: center
---

<img src="perfetto.webp"  class="focus" alt="perfetto screenshot" />

<!--
I won’t dive into how to use the tool either, but suffice to say it was feature rich and showed TONS of low hanging fruit. There’s only so much timing statements can do especially as they don’t let you dive into how third party code is affecting your app. Moreover, the iteration speed is MASSIVE. Whereas for timer logs, you’d have a long cycle time of making an educated guess of where to put the logs, recompile the app, load the app onto a device/emulator, then filter the logs for the one you put (which may not even be there), a flame graph shows you that and more with ONE iteration (with some caveats we will get to later).

Looking further into the flame graph, I began to see problems.

- Systrace is more of a "system level" view of performance
- Much better than placing timers in your app
-->

---
layout: center
---

# <span class="tag">Lesson #4:</span> The startup path is sacred

<!--
The time to interaction is SACRED. I’ve worked on internal apps where loading time was ok to be 10s because, what are the employees going to do??? Customers, however, are unforgiving. Extra time spent loading the app increases bounce rates which for our app would be fatal if too high. Every millisecond spent on that thread must be justified.

- The startup path is sacred
- Customers are unforgiving
- Loading time is $$$
- Every millisecond needs to be justified
-->

---
layout: image
image: android-lifecycle-chart-simple.png
backgroundSize: contain
---

<!--
- The app has to go through several steps to get loaded
- There are many lifecycle methods we just "threw" stuff in because the docs said so
- onCreate, onStart, and onResume need clear paths
-->

---
layout: image
image: android-lifecycle-chart.png
backgroundSize: contain
---

<!--
- This gets more complicated as reality sets in
- Understanding what is included in the startup path takes time and requires you to get into the nitty gritty of frameworks and libraries
-->

---
layout: center
---

# More on my blog...

<div class="flex gap-10">

<img src="spelunking-part-1.png"  class="blog-card" alt="spelunking post part 1" />
<img src="spelunking-part-2.png"  class="blog-card" alt="spelunking post part 2" />

</div>

---
layout: center
---

```kotlin {all|2-7|10-15|16-17|18-21|22-24|25}
class MyActivity : AppCompatActivity() {
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

<!--
- Side note
- We didn't run into this problem but you might
- ContentProviders run before other code
- They do so silently
-->

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

<!--
- Taken from androidx's startup library
- They're super fast, but its easy to add slow code in one of these
-->

---
layout: center
---

# <span class="tag">Lesson #5:</span> Define what <span class="italic">"fully loaded"</span> means

<div>
<span class="text-center" v-click><span class="text-red-500 text-xl opacity-100">Aggressively</span> defer everything else</span>
</div>

<!--
I realized, in contemplating this, we need to define what “fully loaded” actually means. You can’t use time to the application’s `onCreate` because the users don’t care about that; they care if your app is usable. This may be in your `onResume`, but for us, and most apps, this happens later after the UI loads in data. Specifically, for Fire Channels, this was the point where the video started playing or when the browse page loads all visible tiles.

This helps focus where you need to spend your time as not all things need optimizing! Our app had to make a call to the backend (or cache) every time it started up which blocked ALL other work to get to our “fully loaded” state. For example, after that call was fired off, it didn’t matter how long layout inflation of the page took as long as it happened within the time it took to make the call.

- You need to define what "fully loaded" means
- Playback page was "first frame" loaded
- Browse page was all tiles loaded
- This helps you focus on what does and doesn't need to be optimized
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

# <span class="tag">Lesson #6:</span> Dependency injection

<!--
We were using Dagger which is a compile time framework that walks your DI graph to generate DI code for you to avoid expensive reflection based DI at runtime.
-->

---
layout: center
---

<Youtube id="oK_XtfXPkqw" width=800 height=400 />

<!--
- Its a really handy tool
- Compile time everything
- Inspired by Guice for Android
-->

---
layout: quote
---

# "The downside of tools that make things easy <span v-click>is that they make them easy."</span>

<div class="ml-5 mt-1">
<span v-click class="opacity-50">- Me, while debugging this project</span><span v-click> 🥲</span>
</div>

<!--
Dependency injection frameworks as a benefit make it easy to instantiate objects. Dependency injection frameworks as a curse make it too easy to instantiate objects.
-->

---
layout: center
---

# What's the problem?

```java {all|8-10}
@Singleton
public class SharedPreferencesManager {
  @Inject
  public SharedPreferencesManager(Context context) {
    SharedPreferences sharedPref = context.getSharedPreferences(
            getString(R.string.preference_file_key), Context.MODE_PRIVATE);
            
    String bigJsonFile = sharedPref.getString("shared_preferences")
    Preferences preferences = new Gson().fromJson(bigJsonFile, Preferences.class);

    // ...
  }
}
```

---
layout: center
---

# Another example (a hunch)

```java {all|10,13-23}
@Singleton
public class AuthManager {
  private Executors executors;
  private JobScheduler jobScheduler;

  @Inject
  public AuthManager(Executors executors, JobScheduler jobScheduler) {
    this.executors = executors;
    this.jobScheduler = jobScheduler;
    kickOffBackgroundWork();
  }

  private void kickOffBackgroundWork() {
    this.executors.diskIO().submit(() -> {
      // ...
      this.executors.networkIO().submit(() -> {
        // ...
        jobScheduler.startJobs();
      })
      // ...
      jobScheduler.startOtherJobs();
    })
  }
}
```

---
layout: center
---

<Youtube id="PBrhRvhF00k" width=800 height=400 />

<!--
- Another really good talk
-->

---
layout: image
image: class-loading-graph.png
---

<!--
- Class loading can be slow if you load too many
- There are a few other suggestions
    - Avoid `@Singleton` everywhere
    - Consider using `@BindsInstance` instead
    - Avoid needless `Lazy<T>` and `Provider<T>` (more classes and overhead)
-->

---
layout: center
---

<span class="title large">50%!</span>

<!--
- I couldn't validate all of these
- Separating all of the DI code afforded us a 50% speed up
- Not all of it was from the side effects alone
- Probably some portion is class loading
-->

---
layout: center
---

# <span class="tag">Lesson #7:</span> Continuous testing

<!--
Before going onto further optimizations, I’ll side step here to talk about testing performance.

Our QA team already had python scripts that checked for startup time among other things. It also worked well for us so we continued to lean into that. We would cut daily apks to our QA department and they would give us excell sheets measuring how well our startup time was on different devices. We couldn’t test on ALL devices, but we chose a representative subset. Regardless it served as critical feedback in this process.

With active development being done on the app while I was improving performance, sometimes other developers would introduce latency regressions in parallel. Additionally, some performance problems were only problematic on low end devices. Having this set up was extremely valuable.

My regret here was not getting this started earlier. Latency tests could only run on QA machines for some reason, but I prioritized the performance work over getting them working on my machine knowing I had clear wins in front of me. While I wasn’t wrong that I had performance wins in front of me, doing this kicked the can of being able to debug what QA was seeing down the road which made it easier for context to get lost.

One other mistake I made was not defining a clear startup time target upfront. Yes I was making strides in improvement, but upper management wanted an idea of how close we were to meeting goals. I was given ambiguous goals upfront, but didn’t push back for clarifying to actual numbers. This coupled with not starting regular QA testing earlier made for poor progress reporting.

- QA was our continuous testing solution
- They tested on a variety of devices VERY IMPORTANT
- Regret: not starting this earlier or defining a clear goal
- Harder to report without a clear goal to reach
-->

---
layout: center
---

# Macrobenchmark

```kotlin
@LargeTest
@RunWith(AndroidJUnit4::class)
class SampleStartupBenchmark {
    @get:Rule
    val benchmarkRule = MacrobenchmarkRule()

    @Test
    fun startup() = benchmarkRule.measureRepeated(
        packageName = TARGET_PACKAGE,
        metrics = listOf(StartupTimingMetric()),
        iterations = DEFAULT_ITERATIONS,
        setupBlock = {
            // Press home button before each run to ensure the starting activity isn't visible.
            pressHome()
        }
    ) {
        // starts default launch activity
        startActivityAndWait()
    }
}
```

<!--
- Macrobenchmark works like instrumentation tests to exercise common paths
- These are also used to create baseline profiles
    - These are files that contain AOT information so the Dalvik VM can startup the app super quickly
-->

---
layout: image
image: benchmark-tests.png
backgroundSize: contain
---

<!--
The more modern way of doing this is by using androidx’s macro and micro benchmark libraries. Remember how the app was stuck in 2019? This means it was stuck before androidx was created so that was off the list of runs.
-->

---
layout: image
image: benchmark-profile.png
backgroundSize: contain
---

<!--
That being said, I still want to mention this is worth looking at for your team.
-->

---
layout: center
---

# Microbenchmark

```kotlin
@RunWith(AndroidJUnit4::class)
class SampleBenchmark {
    @get:Rule
    val benchmarkRule = BenchmarkRule()

    @Test
    fun benchmarkSomeWork() {
        benchmarkRule.measureRepeated {
            doSomeWork()
        }
    }
}
```

<!--
- Microbenchmark also gets a mention
- It is a unit test solution for smaller units of code
-->

---
layout: center
---

# <span class="tag">Lesson #8:</span> Move critical steps earlier

<!--
With the startup step largely cleaned, next was to make the network (or cache) call as quickly as possible. This was in part as simple as moving a line of code up a few lines.
-->

---
---

<div class="mt-30">

# Yup, that was the fix

```kotlin {monaco-diff}
class MyActivity : AppCompatActivity() {
    override fun onCreate() {
        super.onCreate()
        setContentView(R.layout.main);
        backend.fetchInitialData();
    }
}
~~~
class MyActivity : AppCompatActivity() {
    override fun onCreate() {
        super.onCreate()
        backend.fetchInitialData();
        setContentView(R.layout.main);
    }
}
```

</div>

---
layout: center
---

# <span class="tag">Lesson #9:</span> Improve cache hits

<!--
In development we realized that we were making more calls than necessary at startup because of a bug that set the TTL on some UI elements to 0. Fixing that improved startup time by another second or so.

It was a long road, but by the end of this, we were able to meet our goals. The app now started up within a few seconds on the fast devices and within 10 on the slow ones. Cached startups were even faster.
-->

---
layout: center
---

```kotlin {4}
class MyActivity : AppCompatActivity() {
    override fun onCreate() {
        super.onCreate()
        backend.fetchInitialData();
        setContentView(R.layout.main);
    }
}
```

<!--
In development we realized that we were making more calls than necessary at startup because of a bug that set the TTL on some UI elements to 0. Fixing that improved startup time by another second or so.

It was a long road, but by the end of this, we were able to meet our goals. The app now started up within a few seconds on the fast devices and within 10 on the slow ones. Cached startups were even faster.
-->

---
layout: center
---

# <span class="tag">Lesson #10:</span> Only improve what you need to

<!--
As an extension of my previous point on deciding on a baseline, optimize only what you need to. Obviously we could rewrite this in rust, but not only would the app never get done, but we would lose critical user feedback we can only get from launching.

Using this principle, we left many optimizations on the table, because they weren’t deemed more important than shipping.
-->

---
layout: center
---

```kotlin {5}
class MyActivity : AppCompatActivity() {
    override fun onCreate() {
        super.onCreate()
        backend.fetchInitialData();
        setContentView(R.layout.main);
    }
}
```

<!--
As an extension of my previous point on deciding on a baseline, optimize only what you need to. Obviously we could rewrite this in rust, but not only would the app never get done, but we would lose critical user feedback we can only get from launching.

Using this principle, we left many optimizations on the table, because they weren’t deemed more important than shipping.

- Shipping is more important than squeezing optimizations
- e.g. (For us) layout inflation, backend latency
-->

---
layout: center
---

# <span class="tag">Lesson #11:</span> Observability

<!--
Performance testing will never be able to simulate real user experiences. Only real user experiences show what they’ll be like.

Because we had the key metrics QA tracked observed in production, we got to see what real users experienced. Not only that, but we could detect problems when things went awry later on (dun dun dun). These metrics coupled with some supporting ones like cache hit rate made diagnosing issues fairly straightforward.

- Real user experiences are the ultimate test
- Real metrics allowed us to diagnose user issues quickly, validate change, and make data driven decisions
-->

---
layout: center
---

# More on my blog...

<div class="flex gap-10">

<img src="you-dont-need-mocking.png"  class="blog-card" alt="you dont need mocking post" />
<img src="justifying-mocking.png"  class="blog-card" alt="justifying mocking post" />

</div>

---
layout: image
image: fire-channels-launch.png
---

We finally made it to launch and our app was received rather well! Our work wasn’t over yet. We still had many opportunities especially as more features were piled on. Here are some of the other areas of opportunity.

---
layout: center
---

<span class="title large no-clip">🥳</span>

---
layout: center
---

# <span class="tag">Bonus lesson #1:</span> Enabling compression

<!--
Our backend was pretty optimized, but after launch, Oliver noticed latencies on his device that weren’t well explained by our current understanding of the system. Our backend was taking longer than he expected, about a second or so longer on slower devices.
-->

---
layout: center
---

<span class="text-2xl">`Accept-Encoding: gzip, deflate`</span>

<!--
Our backend calls returned some rather large JSON objects so he looked into compressing them, and behold! He was able to improve startup by another second!

All he did was add an http header like `Accept-Encoding: gzip, deflate` and presto! We had compression working out of the box since our backend framework had this baked in.
-->

---
layout: center
---

# <span class="tag">Bonus lesson #2:</span> Plan for model evolution

<!--
Because our backend was returning a tree of UI components, naturally as feature development continues, we would add more widget types.

- Our app was a tree of UI components
-->

---
layout: center
---

```json {all|2,6,11}
{
  "type": "com.amazon.fc.NavigationMenu",
  "id": "bf8a4404-2439-41da-ae90-e87d1be142e6",
  "navItems": [
    {
      "type": "com.amazon.fc.NavigationMenuItem",
      "id": "ba5da03a-543d-43e4-887f-dd5cc51f2436",
      "to": "home"
    },
    {
      "type": "com.amazon.fc.NavigationMenuItem",
      "id": "2781c98f-fa28-4e07-9fd8-425347ac2f26",
      "to": "sports.football"
    }
    // ...
  ]
}
```

<!--
Older versions of the app wouldn’t have these models in its source code, so it would drop them effectively. Here is a rough one for the navigation we released in the second release.

Although we tested this, we didn’t think to look at how this affected performance. When we released the backend changes to support the upcoming second version of the app, we immediately saw something like a 25% increase in latency.

Confused, we dug into it and found that we hadn’t set up deserialization properly in this case and it was defaulting to a reflective based code path when it encountered the unknown widget.

- Older versions didn't have the new object types
- Nav menu is one example
- 25% increase in latency
-->

---
layout: center
---

<span class="scary">😈 Reflection 😈</span>

<!--
i.e. Jackson looked at all of our custom deserializers, saw we didn’t have any, then tried to use its own reflection based logic as a default. Oops.

- Jackson's reflective based code paths
-->

---
layout: center
---

<span class="title large no-clip">🤦🏼‍♂️</span>

<!--
There were several ways to address this. One idea was to use versioned endpoints and another was to have a “default” widget. We went with the latter, because for our use case it was simpler.

If I could go back, I’d be more forceful advocating for canary widgets to be returned in all environments, even in production. Having something like this would have helped us immensely making sure this didn’t occur again.

- Use canary items to test this
- Regret: be more of an advocate for this position
-->

---
layout: center
---

<div class="text-3xl">

```kotlin
data class UnknownData(val id: String, val ttl: Int)
```

</div>

<!--
There were several ways to address this. One idea was to use versioned endpoints and another was to have a “default” widget. We went with the latter, because for our use case it was simpler.

If I could go back, I’d be more forceful advocating for canary widgets to be returned in all environments, even in production. Having something like this would have helped us immensely making sure this didn’t occur again.

- Use canary items to test this
- Regret: be more of an advocate for this position
-->

---
layout: center
---

# <span class="tag">Bonus lesson #3:</span> Remove network calls entirely

<!--
This wasn’t implemented, but it was a great idea by another of our engineers, Mike. One of our issues we saw in production was the cache wasn’t used as much as we wanted. This was in part because the cached data sometimes had a TTL of 15 minutes.

This was a hard requirement for the content we were distributing. If something went wrong with a video or one of the rows the backend was vending, we wanted to be able to take it down quickly. Consequently, only frequent visitors were able to take full advantage of the cache while most of our users saw cache misses.

Mike pointed out that if we have a background process refreshing the cache asynchronously, we could always have a cache hit on startup! This is great on paper, but, it has the problem of causing a lot of wasted traffic on our backend. For example, we had a job in the news app that ran once every 6h or so to fetch config from the backend. That job alone counted for something like 97% of ALL of our total traffic. It was massively expensive for something that fetched relatively static config.

Where this goes, I don’t know, but it’s worth mentioning in discussions of future performance wins.

- Not implemented, but good idea
- Mike's idea
- TTL of 15min was hard to make useful for our users
    - Needed though cuz of content rules
- Background process refreshing local data
- Could cause a lot of traffic on backend
-->

---
layout: center
---

# Performance isn't scary

<div>

<v-clicks>

🔨 You don't need the fanciest tools

🚢 You don't need it perfect to ship

🔁 Iterate

🧪 Experiment

⌚ Continuously test

🎁 Knowledge is transferrable

</v-clicks>

</div>

---
layout: image-left
image: linktree-qr.png
backgroundSize: contain
---

# <span class="title">Byte Bot</span> <span class="no-clip">helps software teams ship fullstack solutions 🚀</span>

<div>
Let's chat!

Also....
</div>

<div class="flex flex-col gap-5 text-2xl mt-20">

<div>📲 calendly.com/byte-bot</div>
<div>📧 info@bytebot.io</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>
<div>🔗 linkedin.com/in/ryan-clements-hax</div>

</div>
