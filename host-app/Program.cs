using HostappWorld.wit.imports.example.component;

uint left = 1;
uint right = 2;
uint result = AddInterop.Add(left, right);
Console.WriteLine($"Hello {left} + {right} = {result}");