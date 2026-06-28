def histograma1(cadena):
    # histograma cuenta la cantidad de letras en una cadena
    a = b = c = d = e = f = g = h = i = j = k = l = m = n = 0
    ñ = o = p = q = r = s = t = u = v = w = x = y = z = 0
    
    # Convierto todo a minúscula
    cadena = cadena.lower()
    
    # Sumo uno por cada ocurrencia de una letra en el string
    for cc in cadena:
        match cc:
            case 'a': a += 1
            case 'b': b += 1
            case 'c': c += 1    
            case 'c': c += 1
            case 'd': d += 1    
            case 'e': e += 1
            case 'f': f += 1
            case 'g': g += 1
            case 'h': h += 1
            case 'i': i += 1
            case 'j': j += 1
            case 'k': k += 1
            case 'l': l += 1
            case 'm': m += 1
            case 'n': n += 1
            case 'o': o += 1
            case 'p': p += 1
            case 'q': q += 1
            case 'r': r += 1
            case 's': s += 1
            case 't': t += 1
            case 'u': u += 1
            case 'v': v += 1
            case 'w': w += 1
            case 'x': x += 1
            case 'y': y += 1
            case 'z': z += 1
    # Retorno una tupla con todos los contadores
    return (('a', a), ('b', b), ('c', c), ('d', d), ('e', e),
            ('f', f), ('g', g), ('h', h), ('i', i), ('j', j),
            ('k', k), ('l', l), ('m', m), ('n', n), ('o', o),
            ('p', p), ('q', q), ('r', r), ('s', s), ('t', t),
            ('u', u), ('v', v), ('w', w), ('x', x), ('y', y),
            ('z', z))

cucaracha = 'cucaracha'
print("histograma(cucaracha):", histograma1(cucaracha))

puente = 'Hoy te busqué... En la rima que duerme...' 
print("\nhistograma(puente):", histograma1(puente))