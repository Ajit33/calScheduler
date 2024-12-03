import { CloudRain } from "lucide-react"

const features=[
    {
        name: 'Signup for Free',
        description: "You can sign up using both Google and GitHub, and it won't cost you anything.",
        icon: CloudRain,
      },
      {
        name: 'Blazing Fast',
        description: "Our platform is optimized for speed, ensuring a seamless and fast experience.",
        icon: CloudRain, 
      },
      {
        name: 'Super Secure with Nylas',
        description: "Your data is protected with top-notch security powered by Nylas integration.",
        icon: CloudRain, 
      },
      {
        name: 'Easy to Use',
        description: "With an intuitive interface, our platform is designed to be simple and user-friendly.",
        icon: CloudRain, 
      },
]

export function Features(){
    return(
        <div className="py-24">
           <div className="max-w-2xl mx-auto lg:text-center">
            <p className="text-primary font-semibold leading-7">Schedule faster</p>
             <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl ">Schedule meetings in minutes</h1>
             <p className="mt-6 text-base leading-snug text-muted-foreground"> With CalScheduler you can Schedule meetings in minutes.We make it easy for you to schdule meetings in minutes .The meetings are very fast and easy to schedule. </p>
           </div>
           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
               {features.map((feature)=>(
                <div key={feature.name} className="relative pl-16">
                   <div className="text-base font-medium leading-7">
                    <div className="absolute left-0 top-0 flex size-10 items-center justify-center bg-primary rounded-lg">
                        <feature.icon className="size-6 text-white" />
                    </div>
                      {feature.name}
                   </div>
                   <p className="mt-2 text-sm text-muted-foreground leading-snug">{feature.description}</p>
                </div>
               ))}
            </div>
           </div>
        </div>
    )
}