import {Route} from "@angular/router";
import {EffectComponent} from "./demos/effect/effect.component";
import {DemoDirectivesComponent} from "./demos/demo-directives.component";
import {DemoStreamComponent} from "./demos/demo-stream/demo-stream.component";


export const routes: Route[] = [
    {
        component: EffectComponent,
        path: 'effect',
    },
    {
        path: 'directives',
        component: DemoDirectivesComponent
    },
    {
        path: 'stream-directive',
        component: DemoStreamComponent
    }
]
