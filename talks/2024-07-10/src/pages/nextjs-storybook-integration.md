---
---

# Just to get something working...

````md magic-move

```ts
export const configureCss = (
  baseConfig: WebpackConfig,
  nextConfig: NextConfig
): void => {
  const rules = baseConfig.module?.rules
  rules?.forEach((rule, i) => {
    if (
      typeof rule !== 'string' &&
      rule.test instanceof RegExp &&
      rule.test.test('test.css')
    ) {
      rules[i] = {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              ...getImportAndUrlCssLoaderOptions(nextConfig),
              modules: {
                auto: true,
                getLocalIdent: getCssModuleLocalIdent
              }
            }
          },
          'postcss-loader'
        ]
      }
    }
  })
  rules?.push({
    test: /\.(scss|sass)$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 3,
          ...getImportAndUrlCssLoaderOptions(nextConfig),
          modules: { auto: true, getLocalIdent: getCssModuleLocalIdent }
        }
      },
      'postcss-loader',
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          sassOptions: nextConfig.sassOptions,
          additionalData:
            nextConfig.sassOptions?.prependData ||
            nextConfig.sassOptions?.additionalData
        }
      }
    ]
  })
}
```

```ts
import { Configuration as WebpackConfig, RuleSetRule } from 'webpack'
import { addScopedAlias, getNextjsVersion } from '../utils'

export const configureImages = (baseConfig: WebpackConfig): void => {
  configureStaticImageImport(baseConfig)
  addScopedAlias(baseConfig, 'next/image')
}

const fallbackFilename = 'static/media/[path][name][ext]'

const configureStaticImageImport = (baseConfig: WebpackConfig): void => {
  const rules = baseConfig.module?.rules
  const assetRule = rules?.find(
    rule =>
      typeof rule !== 'string' &&
      rule.test instanceof RegExp &&
      rule.test.test('test.jpg')
  ) as RuleSetRule
  assetRule.test = /\.(apng|eot|otf|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
  rules?.push({
    test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i,
    issuer: { not: /\.(css|scss|sass)$/ },
    use: [
      {
        loader: require.resolve('./next-image-loader-stub'),
        options: {
          filename: assetRule.generator?.filename ?? fallbackFilename
        }
      }
    ]
  })
  rules?.push({
    test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i,
    issuer: /\.(css|scss|sass)$/,
    type: 'asset/resource',
    generator: {
      filename: assetRule.generator?.filename ?? fallbackFilename
    }
  })
}
```

```tsx
import * as _NextImage from 'next/image'
import { ImageProps } from 'next/image'

const NextImage = require('next/image') as typeof _NextImage

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: ImageProps) =>
    typeof props.src === 'string' ? (
      <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextImage {...props} unoptimized />
    )
})

Object.defineProperty(NextImage, '__esModule', {
  configurable: true,
  value: true
})
```

```ts
import { interpolateName } from 'loader-utils'
import imageSizeOf from 'image-size'
import { RawLoaderDefinition } from 'webpack'

interface LoaderOptions {
  filename: string
}

const nextImageLoaderStub: RawLoaderDefinition<LoaderOptions> = function (
  content
) {
  const { filename } = this.getOptions()
  const outputPath = interpolateName(
    this,
    filename.replace('[ext]', '.[ext]'),
    {
      context: this.rootContext,
      content
    }
  )

  this.emitFile(outputPath, content)

  const { width, height } = imageSizeOf(content)

  return `export default ${JSON.stringify({
    src: outputPath,
    height,
    width,
    blurDataURL: outputPath
  })};`
}

nextImageLoaderStub.raw = true

export = nextImageLoaderStub
```

```ts
import { RouterContext } from './resolved-router-context'
import Router from 'next/router'
import { action } from '@storybook/addon-actions'
import { StoryContext } from '@storybook/addons'

const defaultRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push(...args: unknown[]): Promise<boolean> {
    action('nextRouter.push')(...args)
    return Promise.resolve(true)
  },
  replace(...args: unknown[]): Promise<boolean> {
    action('nextRouter.replace')(...args)
    return Promise.resolve(true)
  },
  reload(...args: unknown[]): void {
    action('nextRouter.reload')(...args)
  },
  back(...args: unknown[]): void {
    action('nextRouter.back')(...args)
  },
  prefetch(...args: unknown[]): Promise<void> {
    action('nextRouter.prefetch')(...args)
    return Promise.resolve()
  },
  beforePopState(...args: unknown[]): void {
    action('nextRouter.beforePopState')(...args)
  },
  events: {
    on(...args: unknown[]): void {
      action('nextRouter.events.on')(...args)
    },
    off(...args: unknown[]): void {
      action('nextRouter.events.off')(...args)
    },
    emit(...args: unknown[]): void {
      action('nextRouter.events.emit')(...args)
    }
  },
  isFallback: false
}

export const RouterDecorator = (
  Story: React.FC,
  context: StoryContext
): React.ReactNode => {
  const nextRouterParams = context.parameters.nextRouter ?? {}

  Router.router = {
    ...defaultRouter,
    locale: context?.globals?.locale,
    ...nextRouterParams
  } as NonNullable<typeof Router.router>

  return (
    <RouterContext.Provider value={Router.router}>
      <Story />
    </RouterContext.Provider>
  )
}
```

````
